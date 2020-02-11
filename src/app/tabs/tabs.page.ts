import { Component } from '@angular/core';
import { RabbitmqService } from '../services/rabbitmq.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  disabled = false;
  messages: number = 0;

  constructor(private rabbitmqservice: RabbitmqService) {
    this.rabbitmqservice.messages.subscribe(e=> {
      this.messages = e.length;
    });

    this.rabbitmqservice.group.subscribe(e=> {
    if (localStorage.getItem('afdeling') != "start") {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
    });
  }
  
}

