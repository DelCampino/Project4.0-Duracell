import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Stomp } from "stomp.js";
import { RabbitmqService } from '../services/rabbitmq.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() messages: Array<Message>;
  ws = null;
  client = null;

  constructor(public modalController: ModalController, public rabbitmqservice: RabbitmqService) { }

  ngOnInit() {
    console.log(this.messages);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }

  confirm(messages) {
    this.ws = new WebSocket('ws://81.82.52.102:15674/ws'); // SERVER
    //this.ws = new WebSocket('ws://localhost:15674/ws'); // LOCAL
    this.client = Stomp.over(this.ws);

    this.client.heartbeat.incoming = 0;
    this.client.heartbeat.outgoing = 5000;

    var bind = this;
    var on_connect = function() {
      //alert("connected to new queue: " + toQueue)
      bind.client.send('/exchange/' + localStorage.getItem('afdeling') + '/', {}, "ack-" + messages[0].message.body);
      bind.client.disconnect();
    };
    var on_error =  function() {
    };

    this.client.connect('team4', 'team4', on_connect, on_error, 'team4vhost'); // SERVER
    this.modalController.dismiss();
  }
}
