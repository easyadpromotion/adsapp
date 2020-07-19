import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseDbService } from './firebase-db.service';

@Injectable({
  providedIn: 'root'
})
export class  UserService {
userData;
referredUser
  constructor(public router:Router,public firebase:FirebaseDbService) { }

  getLoginData(){
    let data=JSON.parse(localStorage.getItem('userData'));
    if(data!==null)
    {
      return data
    }else{
      console.log(data)
      this.router.navigateByUrl('/login');
    }
  }
  
  getRole(){
    try{
      this.userData = JSON.parse(localStorage.getItem('userData'))
      return (this.userData && this.userData.roleId)?this.userData.roleId:'';
    }catch(e){}
  }

  getName(){
    try{
      this.userData = JSON.parse(localStorage.getItem('userData'))
      return (this.userData && this.userData.name)?this.userData.name:'';
    }catch(e){}
  }

  getUserId(){
    try{
      this.userData = JSON.parse(localStorage.getItem('userData'))
      return (this.userData && this.userData.phoneNumber)?this.userData.phoneNumber:'';
    }catch(e){}

  }

  updateUser(data){
    data['fcm']=localStorage.getItem('fcm');
    data['addressGeo']=localStorage.getItem('addressGeo');
    this.firebase.updateData('users',this.getUserId()+"",data).then(res=>{
      console.log(res)
    
    }).catch(err=>{
      console.log(err)
      
    })
  }

  updateWallet(amount){
    let updatedAmount=eval(this.getWalletAmount()+"")+eval(amount+"");
    console.log("updatedamount"+amount,updatedAmount,this.getWalletAmount())
    this.updateUser({walletAmount:updatedAmount});
    let loginData=this.getLoginData();
    loginData['walletAmount']=updatedAmount;
    localStorage.setItem('userData',JSON.stringify(loginData));
  }

  checkRouteAccess(){
    if(localStorage.getItem('userData')===null){
      
      return false;
    }else{
      return true;
    }
  }

 

  getWalletAmount(){
    try{
      this.userData = JSON.parse(localStorage.getItem('userData'))
      let amount=this.userData.walletAmount?this.userData.walletAmount:0;
      return eval(amount+"").toFixed(2);
    }catch(e){}

  }

getUserLocation()
{
  return (localStorage.getItem('area'));
}

}
