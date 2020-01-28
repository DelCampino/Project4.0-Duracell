import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Stomp } from "stomp.js";
import { BehaviorSubject } from 'rxjs';
import { RabbitmqService } from './services/rabbitmq.service';
<<<<<<< HEAD
import { TIMEOUT } from 'dns';
=======
import { ThemeService } from './services/theme.service';
>>>>>>> afd362ffe84d3790d474d165f9143afeb726fc50

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
    private themeSwitcher: ThemeService
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
      bind.connection = true;
      //alert("connected to new queue: " + toQueue)
      bind.client.subscribe(queue, function(message) {
        console.log("Message received: " + message);
        bind.updateMessages(message);
      });
    };
    var on_error =  function() {
      bind.connection = false;
      setTimeout(() => bind.changeQueue(toQueue), 5000)
    };

    
    //this.client.connect('team4', 'team4', on_connect, on_error, 'team4vhost'); // SERVER
    this.client.connect('guest', 'guest', on_connect, on_error, '/'); // LOCAL
  }

  updateMessages(message) {
    this.rabbitmqservice.messages.next([...this.rabbitmqservice.messages.value, message]);
    console.log(this.rabbitmqservice.messages.value);
  }

  ThemeSwitcher() {
    // 0 = day mode
    // 1 = night mode
    if (this.themeSwitcher.currentTheme === 0) {
      this.themeSwitcher.setTheme('night');
      this.themeSwitcher.currentTheme = 1;
    } else {
      this.themeSwitcher.setTheme('day');
      this.themeSwitcher.currentTheme = 0;
    }
  }


}