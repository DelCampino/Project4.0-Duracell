import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Stomp } from "stomp.js";
import { BehaviorSubject } from 'rxjs';
import { RabbitmqService } from './services/rabbitmq.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  ws = null;
  client = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private rabbitmqservice: RabbitmqService
  ) 
  {
    this.initializeApp();
    this.rabbitmqservice.group.subscribe(e=> {
      console.log("Changing queue to:" + e);
      //if (this.client != null) {
      //  this.client.disconnect();
      //}

    

      this.changeQueue(e);

    
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.changeQueue("hello");
  }



  changeQueue(toQueue) {
    //this.ws = new WebSocket('ws://192.168.1.2:15674/ws'); // SERVER
    this.ws = new WebSocket('ws://localhost:15674/ws'); // LOCAL
    this.client = Stomp.over(this.ws);

    var queue = '/queue/' + toQueue
    var bind = this;
    var on_connect = function() {
      //alert("connected to new queue: " + toQueue)
      bind.client.subscribe(queue, function(message) {
        console.log("Message received: " + message);
        bind.updateMessages(message);
      });
    };
    var on_error =  function() {
      alert('error');
    };

    
    //this.client.connect('team4', 'team4', on_connect, on_error, 'team4vhost'); // SERVER
    this.client.connect('guest', 'guest', on_connect, on_error, '/'); // LOCAL
  }

  updateMessages(message) {
    this.rabbitmqservice.messages.next([...this.rabbitmqservice.messages.value, message]);
    console.log(this.rabbitmqservice.messages.value);
  }

}