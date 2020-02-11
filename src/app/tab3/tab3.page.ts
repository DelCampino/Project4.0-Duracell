import { Component } from '@angular/core';
import { RabbitmqService } from '../services/rabbitmq.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
groups: String[];
currentGroup : String;
groepAlertStatus = localStorage.getItem('groepAlertStatus');
  constructor(private rabbitmqservice: RabbitmqService, public toastController: ToastController, public alertController: AlertController) {
    this.groups = ["Afdeling A", "Afdeling B", "Afdeling C", "Afdeling D", "Afdeling E"]
   
    console.log(this.groepAlertStatus);
    if(this.groepAlertStatus == null){
      this.presentAlert();
      //console.log("test")
    }

    this.rabbitmqservice.group.subscribe(e => {this.currentGroup = e})
    
  }
  

  async select(item, slidingItem) {
    if(item != localStorage.getItem('afdeling'))
    {
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
    else
    {
      slidingItem.close();
      this.showToast("U bent al met " + item);
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Afdeling scherm',
      message: 'Hier kunt u een afdeling selecteren. U zult meldingen ontvangen gebaseerd op uw keuze. Veeg naar links op een afdeling om te selecteren.',
      buttons: [
        {
          text: 'Begrepen!',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            localStorage.setItem('groepAlertStatus', '1')
          }
        }
      ]
    });

    await alert.present();
  }

  clearAlert(){
    localStorage.removeItem('groepAlertStatus')
  }

  async showToast(e){
    const toast = await this.toastController.create({
      message: e + ' verbonden',
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
