import { Component } from '@angular/core';
import { RabbitmqService } from '../services/rabbitmq.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  messages: any[];
  notificationAlertStatus = localStorage.getItem('notificationAlertStatus');
  constructor(private rabbitmqservice: RabbitmqService, public alertController: AlertController) {
    this.rabbitmqservice.messages.subscribe(e=> {
      this.messages = e;
    });


    if(this.notificationAlertStatus == null){
      this.presentAlert();
    }

    }

    unread(item) {
      this.messages.splice(this.messages.indexOf(item), 1);
      this.rabbitmqservice.messages.next(this.messages);
    }

    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Notificaties',
        message: 'Hier kunt u al uw berichten bekijken van de afdeling waarop u bent geabonneerd.',
        buttons: [
          {
            text: 'Begrepen!',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              localStorage.setItem('notificationAlertStatus', '1')
            }
          }
        ]
      });
  
      await alert.present();
    }

    clearAlert(){
      localStorage.removeItem('notificationAlertStatus')
    }
  }
  
