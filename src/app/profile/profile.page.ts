import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoaderService } from '../loader.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user
  wallet={}
  json:any=[]
  userWAmount;
  userLocation;

  profilePic
  constructor(public menuCtrl: MenuController,public loaderService: LoaderService,private router: Router,public userService:UserService,  
     public httpService: HttpServiceService) { }

  ngOnInit() { this.loaderService.hideLoader();
    this.userWAmount = this.userService.getWalletAmount()
  this.user = JSON.parse(localStorage.getItem('userData'))
  console.log(this.user)
  this.profilePic=this.getSplittedname(this.user['profilePic'])
 
  this.userLocation=this.userService.getUserLocation();
 

            

            
  }


ionViewWillEnter()
{
  this.userWAmount = this.userService.getWalletAmount()
  this.user = JSON.parse(localStorage.getItem('userData'))
  console.log(this.user)
  this.profilePic=this.getSplittedname(this.user['profilePic'])
 
  this.userLocation=this.userService.getUserLocation();
 

             

}



  // walletServiceAdd(){
  //   console.log("wallet service",this.userService.getUserId())
  //   this.wallet['userId']=this.userService.getUserId();
  //   this.wallet['creditDebit']='1';
  //   this.wallet['videoFrameSurveyId']='1';
  //   this.wallet['amount']= '10'
  //   this.wallet['status']='1';
  //   this.wallet['isAvailable']='1';
  //   this.walletService.walletUpdateCredit(this.wallet)
  // }
  // walletServiceAddDebit(){
  //   console.log("wallet service",this.userService.getUserId())
  //   this.wallet['userId']=this.userService.getUserId();
  //   this.wallet['creditDebit']='0';
  //   this.wallet['videoFrameSurveyId']='1';
  //   this.wallet['amount']= '10'
  //   this.wallet['status']='1';
  //   this.wallet['isAvailable']='1';
  //   this.walletService.walletUpdateDebit(this.wallet)
  // }


  openMenu() {
    this.menuCtrl.open();
  }

  logout(){
    localStorage.clear();
    this.user=Array();
    this.loaderService.hideLoader();
    this.router.navigate(['/login'])
  }


  getSplittedname(url){
    let n=url.replace('public/','');
    return n;
  }

  updateProfile(data)
  {
    localStorage.setItem('userDetails', JSON.stringify(data));
    this.router.navigate(['/update-profile'])
  }



  redeemAmount()
  {
   
  }

}
