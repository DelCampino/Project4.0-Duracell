import { Component } from '@angular/core';
import { RabbitmqService } from '../services/rabbitmq.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  messages: any[];
  constructor(private rabbitmqservice: RabbitmqService) {
    this.rabbitmqservice.messages.subscribe(e=> {
      this.messages = e;
    });

    }

    unread(item) {
      this.messages.splice(this.messages.indexOf(item), 1);
      this.rabbitmqservice.messages.next(this.messages);
    }
  }
