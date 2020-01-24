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
    this.groups = ["Werkvloer A", "Werkvloer B", "Werkvloer C", "Werkvloer D", "Werkvloer F", "Werkvloer G", "Werkvloer H",]
  }

  select(item) {
    this.rabbitmqservice.group.next(item);
  }
}
