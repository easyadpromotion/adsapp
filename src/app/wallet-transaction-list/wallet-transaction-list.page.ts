import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, MenuController } from '@ionic/angular';
import { HttpServiceService } from '../http-service.service';
import { AlertService } from '../alert.service';
import { LoaderService } from '../loader.service';
import { UtilService } from '../util.service';
import { UserService } from '../user.service';

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
    console.log(this.user[0])
    //instead gpsAddress use upiAddress
   if(this.user[0].upiAddress == "")
   {
    this.presentPrompt();
   
   }
else{
  console.log(this.user[0].upiAddress)
  this.presentPrompt1();
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
              console.log(data.upiAddress)
            
              this.data1=this.user[0];
              this.data1['upiAddress']=data.upiAddress;
              this.data1['walletAmount']='0'
             console.log(this.data1)
              data['updatedAt']=new Date().getTime();
              this.loaderService.showLoader('Updating Please wait ..').then(()=>{
                try{
                  this.httpService.postApi(this.data1, 'user/updateDetails/' + this.data1['_id']).subscribe((res: any) => {
                    this.loaderService.hideLoader();
                    if (res["success"]) {
                      let redeemdata:any = {}
    redeemdata['userId']=this.user[0]._id;
    redeemdata['amount']=this.user[0].walletAmount;
    redeemdata['status']='1';
    redeemdata['isAvailable']='1';
console.log(redeemdata)
    // this.redeem.redeemRequest(redeemdata);
                      this.alertService.presentAlert('Success','Successfully updated','Okay');
                      localStorage.setItem('userData', JSON.stringify([this.data1]));
                      console.log("data",this.data1)
                      this.router.navigate(['/home'])
                    } else {
                      this.alertService.presentAlert('Error',res["message"],'Okay');
                    }
                  },(err)=>{
                    
                    this.loaderService.hideLoader();
                    this.alertService.presentNetworkAlert();
                   });    
                }catch(e){
                  this.loaderService.hideLoader();
                  this.alertService.presentAlert('Error','Something went wrong please try again','Okay');
                }
              })

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

  // public openModal(template: TemplateRef<any>){
  //   this.modalRef = this.modalService.show(template);
  // }
  presentPrompt1()
  {

    

    this.data1=this.user[0];
   
    this.data1['walletAmount']='0'
    this.data1['updatedAt']=new Date().getTime();
    this.loaderService.showLoader('Updating Please wait ..').then(()=>{
      try{
        this.httpService.postApi(this.data1, 'user/updateDetails/' + this.data1['_id']).subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            let redeemdata:any = {}
    redeemdata['userId']=this.user[0]._id;
    redeemdata['amount']=this.user[0].walletAmount;
    redeemdata['status']='1';
    redeemdata['isAvailable']='1';
console.log(redeemdata)
    // this.redeem.redeemRequest(redeemdata);
            this.alertService.presentAlert('Success','Successfully updated','Okay');
            localStorage.setItem('userData', JSON.stringify([this.data1]));
            console.log("data",this.data1)
            this.router.navigate(['/home'])
          } else {
            this.alertService.presentAlert('Error',res["message"],'Okay');
          }
        },(err)=>{
          
          this.loaderService.hideLoader();
          this.alertService.presentNetworkAlert();
         });    
      }catch(e){
        this.loaderService.hideLoader();
        this.alertService.presentAlert('Error','Something went wrong please try again','Okay');
      }
    })
  }
}
