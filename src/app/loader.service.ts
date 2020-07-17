import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as $ from 'jquery'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  loading;
  constructor(public loadingCtrl:LoadingController) { }

  
  // showLoader(message) {
  //   return new Promise(async (resolve)=>{
  //     this.loading = await this.loadingCtrl.create({
  //       "message": message
  //     });
  //     this.loading.present();
  //     resolve();
  //   })
  // }
  
  // hideLoader(){
    
  //   try{
  //     this.loading.dismiss();
  //     this.loading=null;
  //   }catch(e){
  //     console.error(e);
  //     this.loading=null;
  //   }
  // }

  showLoader(loaderText){
    return new Promise((resolve,reject)=>{
     $('#preloader').show();
      resolve(1);
    })
  }

  hideLoader(){
    // alert();
   $("#preloader").hide();
  }

}
