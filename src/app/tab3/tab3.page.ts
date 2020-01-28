import { Component } from '@angular/core';
import { RabbitmqService } from '../services/rabbitmq.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
groups: String[];
  constructor(private rabbitmqservice: RabbitmqService, public toastController: ToastController) {
    this.groups = ["Afdeling A", "Afdeling B", "Afdeling C", "Afdeling D", "Afdeling E"]
  }

  async select(item, slidingItem) {
    this.rabbitmqservice.group.next(item);
    slidingItem.close();
    const toast = await this.toastController.create({
      message: item + ' geselecteerd',
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
