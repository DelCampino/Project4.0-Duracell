import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Stomp } from "stomp.js";
import { BehaviorSubject } from 'rxjs';
import { RabbitmqService } from './services/rabbitmq.service';
import { ThemeService } from './services/theme.service';
import { Message } from './models/message';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  ws = null;
  client = null;
  connection = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private rabbitmqservice: RabbitmqService,
    private toastController: ToastController,
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode
  ) {

    this.initializeApp();
    this.backgroundMode.enable();
    this.rabbitmqservice.group.subscribe(e => {

      //console.log("Changing queue to:" + e);
      if (this.client != null) {
        //console.log("client =" + this.client);
        this.client.disconnect();
      }
      this.changeQueue(e);


      if (e != 'start') {
        this.showToast(e);
      }

    });


    if (localStorage.getItem("messages") != null) {
      var local = JSON.parse(localStorage.getItem("messages"));
      local.map(x => x.map(y => y['timestamp'] = new Date(y['timestamp'])));
      //console.log(local);
      this.rabbitmqservice.messages.next(local);
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

  }

  changeQueue(toQueue) {
    this.ws = new WebSocket('ws://81.82.52.102:15674/ws'); // SERVER
    //this.ws = new WebSocket('ws://localhost:15674/ws'); // LOCAL
    this.client = Stomp.over(this.ws);

    this.client.heartbeat.incoming = 0;
    this.client.heartbeat.outgoing = 1000;

    localStorage.setItem('afdeling', toQueue);

    if (localStorage.getItem('guid') == null) {
      var guid = Guid.create().toString();
      localStorage.setItem('guid', guid);
    } else {
      var guid = localStorage.getItem('guid');
    }

    var queue = '/exchange/' + toQueue + '/';
    var bind = this;
    var on_connect = function () {
      bind.connection = true;

      bind.client.subscribe(queue, function (message) {
        console.log("Message received: " + message);
        bind.updateMessages(message);
      }, { 'x-queue-name': guid + ' - ' + toQueue, durable: true, 'auto-delete': false });
    };
    var on_error = function () {
      bind.connection = false;
      bind.changeQueue(toQueue);
    };


    this.client.connect('team4', 'team4', on_connect, on_error, 'team4vhost'); // SERVER
    //this.client.connect('guest', 'guest', on_connect, on_error, '/'); // LOCAL

  }

  sendNotif(sensorId, sensorValue) {
    if(!Number.isNaN(Number(sensorId))){
      this.localNotifications.schedule({
        id: 1,
        text: 'Waarschuwing - ' + 'Sensor ' + sensorId + '\n' + 'Waarde: ' + sensorValue,
      });
    }
    else{
      this.localNotifications.schedule({
        id: 1,
        text: 'Waarschuwing - ' + sensorId + '\n' + 'Waarde: ' + sensorValue,
      });
    }
    
  }

  updateMessages(message) {
    var date = new Date(message.headers.timestamp * 1000);
    //console.log(message.body);
    var values = message.body.split('/');
    //console.log(values);
    var value = values[0];

    var id = values[1];

    if(!Number.isNaN(Number(id))){
      var exists = this.rabbitmqservice.messages.value.findIndex(array => array[0].id == "Sensor " + id);
    }else{
      exists = this.rabbitmqservice.messages.value.findIndex(array => array[0].id === id);
    }

    if ('ack-' == value.substring(0, 4)) {
      //console.log("ACKNOWLEDGE");
      var messagesNew = this.rabbitmqservice.messages.value;
      let exists = this.rabbitmqservice.messages.value.findIndex(array => array[0].id === id);
      messagesNew.splice(exists, 1);
      this.rabbitmqservice.messages.next(messagesNew);
    } else {

      if(!Number.isNaN(Number(id))){
        id = "Sensor " + id;
      }

      if (exists != -1) {
        //console.log("ADD TO EXISTING");
        var addExisting = new Message(message, date, id, value);
        var messagesNew = this.rabbitmqservice.messages.value;
        //console.log(addExisting);
        messagesNew[exists].push(addExisting);
        this.rabbitmqservice.messages.next(messagesNew);
        this.sendNotif(id, value);
      } else {
        //console.log("ADD TO NEW");
        var add = [new Message(message, date, id, value)];
        this.rabbitmqservice.messages.next([...this.rabbitmqservice.messages.value, add]);
        this.sendNotif(id, value);
      }
      //console.log(this.rabbitmqservice.messages.value)
    }
  }



  async showToast(e) {
    const toast = await this.toastController.create({
      message: e + ' verbonden',
      duration: 2000,
      position: 'top',
      color: 'primary',
      buttons: [{
        icon: "information-circle",
        side: 'start'

      }]
    });

    toast.present();
  }


}