<<<<<<< HEAD
import { Component, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
=======
import { Component } from '@angular/core';
import { RabbitmqService } from '../services/rabbitmq.service';
>>>>>>> e93162ad8424bab257189061df5d9434f67bffaf

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  messages: number = 0;

  constructor(private rabbitmqservice: RabbitmqService) {
    this.rabbitmqservice.messages.subscribe(e=> {
      this.messages = e.length;
    });
  }

}

