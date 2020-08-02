import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, MenuController } from '@ionic/angular';
import { HttpServiceService } from '../http-service.service';
import { AlertService } from '../alert.service';
import { LoaderService } from '../loader.service';
import { UtilService } from '../util.service';
import { UserService } from '../user.service';
import { FirebaseDbService } from '../firebase-db.service';

@Component({
  selector: 'app-wallet-transaction-list',
  templateUrl: './wallet-transaction-list.page.html',
  styleUrls: ['./wallet-transaction-list.page.scss'],
})
export class WalletTransactionListPage implements OnInit {

  json: any=[];
  userWAmount;
id
user
data1:any={}

  constructor(private router: Router, public loadingCtrl: LoadingController,private alertCtrl: AlertController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public loaderService: LoaderService, public utilService:UtilService,
    public firebase:FirebaseDbService,
    public menuCtrl:MenuController,public userService:UserService) { }

  openMenu(){
    this.menuCtrl.open();
  }


  loadData(){
    
  }

  ionViewWillEnter(){
    
    this.user = JSON.parse(localStorage.getItem('userData'))
    console.log("user data",this.user)
    this.userWAmount = this.userService.getWalletAmount()
    this.id = this.userService.getUserId()
    this.loadData();
  }

  ngOnInit() { this.loaderService.hideLoader();
    this.user = JSON.parse(localStorage.getItem('userData'))
    this.userWAmount = this.userService.getWalletAmount()
    this.id = this.userService.getUserId()
  }
  // add() {
  //   this.router.navigate(['/wallet-history-add'])
  // }

  details(data) {
    localStorage.setItem('walletHistoryDetails', JSON.stringify(data));
    this.router.navigate(['/wallet-transactions-details'])
  }

  changePassword()
  {
    this.router.navigate(['/change-password'])
  }
  
  redeemAmount()
  {
    if(this.userService.getWalletAmount()<2){
      this.alertService.presentAlert('Error','Wallet amount must be atlease 2rs to redeem','Ok');
      return;
    }
    //instead gpsAddress use upiAddress
   if(this.user.upiAddress == "")
   {
    this.presentPrompt();
   
   }
    else{
    this.redeem(this.user.upiAddress);
    }


  }
 
  async presentPrompt() {
    let alert =await this.alertCtrl.create({
     
      inputs: [
        {
          name: 'upiAddress',
          placeholder: 'Enter UPI'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            if ((data.upiAddress)) {
              // logged in!
              this.redeem(data.upiAddress);

              //
            } 
            //else {
            //   // invalid login
            //   return false;
            // }
          }
        }
      ]
    });
   await alert.present();
  }

  redeem(upi){
    let amount=this.userService.getWalletAmount();
    let json:any=
    {
      userId:this.userService.getUserId(),
      amount,
      createdAt:new Date().toISOString(),
      status:1,
      upiAddress:upi
    }

    this.firebase.addData('redeemRequests',json);
    json={};
      json['userId']=this.userService.getUserId();
      json['transactionType']="redeem";
      json['videoFrameSurveyId']='-';
      json['type']='photo';
      json['amount']= 0;
      json['status']=1;
      this.firebase.addData('transactions',json);
      

    let loginData=this.userService.getLoginData();
    loginData['walletAmount']=0.0;
    loginData['upiAddress']=upi;
    this.userService.updateUser(loginData);
    localStorage.setItem('userData',JSON.stringify(loginData));
  }

}
