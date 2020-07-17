import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertCtrl:AlertController) { }

  presentAlert = async (header,message,buttonText) => {
		const alert = await this.alertCtrl.create({
			header: header,
			subHeader: '',
			message: message,
			buttons: [ buttonText ]
		});

		await alert.present();
  };
  presentNetworkAlert = async () => {
	const alert = await this.alertCtrl.create({
		header: 'Oops',
		subHeader: '',
		message: 'Something went wrong, Please check your internet',
		buttons: [ {
			text: 'Try Again',
			role: 'cancel',
			handler: data => {
			  //window.location.reload();
			}
		  }, ]
	});

	await alert.present();
};
  
}
