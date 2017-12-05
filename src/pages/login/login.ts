import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
  	public navCtrl: NavController,
  	public alertCtrl: AlertController) {

  }

  showConfirm() {
  	let confirm = this.alertCtrl.create({
  		title: '"EMware" Would Like to Send You Notifications',
  		message: 'Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.',
  		buttons: [
  			{
  				text: 'Disagree',
  				handler: () => {
  					console.log('Disagree clicked');
  				}
  			},
  			{
  				text: 'Agree',
  				handler: () => {
  					console.log('Agree clicked');
  				}
  			}
  		],
  	});
  	confirm.present()
  }

  showPrompt() {
  	let prompt = this.alertCtrl.create({
  		title: 'Sign Up',
  		message: "Become a member to start tracking and saving!",
  		inputs: [
  			{
  				name: 'firstname',
  				placeholder: 'Enter First Name'
  			},

  			{
  				name: 'lastname',
  				placeholder: 'Enter Last Name'
  			},

  			{
  				name: 'email',
  				placeholder: 'Enter E-mail Address'
  			},

  			{
  				name: 'password',
  				placeholder: 'Create a password'
  			},

  			{
  				name: 'passwordconfirmation',
  				placeholder: 'Confirm Password'
  			}
  		],

  		buttons: [
  			{
  				text: 'Cancel',
  				handler: data => {
  					console.log('Cancel clicked');
  				}
  			},
  			{
  				text: 'Sign Up',
  				handler: data => {
  					console.log('Saved clicked');
  				}
  			}
  		]
  	});
  	prompt.present();
  }

}
