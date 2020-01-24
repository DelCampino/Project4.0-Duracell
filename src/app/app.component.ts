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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private rabbitmqservice: RabbitmqService
  ) 
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    var ws = new WebSocket('ws://192.168.1.2:15674/ws');
    var client = Stomp.over(ws);
  
    var on_connect = function() {
      alert("connected")
      client.subscribe('/queue/test', function(message) {
        console.log("Message received: " + message);
        //this.updateMessages(message);
        alert(message);
      });
    };
    var on_error =  function() {
      alert('error');
    };

    client.connect('team4', 'team4', on_connect, on_error, 'team4vhost');
  }

  updateMessages(message) {
    this.rabbitmqservice.messages.next([...this.rabbitmqservice.messages.value, message]);
  }

}
