import { Component } from '@angular/core';
import { RabbitmqService } from '../services/rabbitmq.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
groups: String[];
  constructor(private rabbitmqservice: RabbitmqService) {
    this.groups = ["Afdeling A", "Afdeling B", "Afdeling C", "Afdeling D", "Afdeling E"]
  }

  select(item) {
    this.rabbitmqservice.group.next(item);
  }
}
