import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router'
import { HttpServiceService } from 'src/app/http-service.service';
import { LoaderService } from 'src/app/loader.service';
@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.page.html',
  styleUrls: ['./my-ads.page.scss'],
})
export class MyADsPage implements OnInit {
  role;
  userWAmount;
  id;
  photojson: any=[];
  videosjson:any=[];
  surveyjson:any=[];
  constructor(public menuCtrl: MenuController,public loaderService:LoaderService, public userService:UserService,private router: Router,public httpService: HttpServiceService) { }

  ngOnInit() { this.loaderService.hideLoader();
  
    this.role = this.userService.getRole()
    console.log(this.role)
    this.userWAmount = this.userService.getWalletAmount()
    this.id = this.userService.getUserId()
    console.log(this.id)
      this.httpService.postApi({userId:this.id},'createPhotoFrame/getByCondition').subscribe((res: any) => {
      console.log(res.data);
      this.photojson = res.data;
      
     });
  
     //videos
     this.httpService.postApi({userId:this.id},'createVideo/getByCondition').subscribe((res: any) => {
      console.log(res.data);
      this.videosjson = res.data;
     });
  
     //survey
     this.httpService.postApi({userId:this.id},'surveyQuestions/getByCondition').subscribe((res: any) => {
      console.log(res.data);
      this.surveyjson = res.data;
     });
  }

  getTotalUsers(json){
    let total=0;
    let reached=0;
    json.forEach(element => {
      total+=eval(element.targetCount)
      reached+=eval(element.targetReached)
    });
    return reached.toFixed(1)+"/"+total.toFixed(1)
  }

  getTotalAmount(json){
    let total=0;
    let reached=0;
    json.forEach(element => {
      total+=eval(element.paymentAmount)
      reached+=(eval(element.paymentAmount)/70)*eval(element.targetReached)
    });
    return (reached.toFixed(1)+"/"+total.toFixed(1))
  }

ionViewWillEnter()
{
  this.role = this.userService.getRole()
  console.log(this.role)
  this.userWAmount = this.userService.getWalletAmount()
  this.id = this.userService.getUserId()
  console.log(this.id)
    this.httpService.postApi({userId:this.id},'createPhotoFrame/getByCondition').subscribe((res: any) => {
    console.log(res.data);
    this.photojson = res.data;
    
   });

   //videos
   this.httpService.postApi({userId:this.id},'createVideo/getByCondition').subscribe((res: any) => {
    console.log(res.data);
    this.videosjson = res.data;
   });

   //survey
   this.httpService.postApi({userId:this.id},'surveyQuestions/getByCondition').subscribe((res: any) => {
    console.log(res.data);
    this.surveyjson = res.data;
   });
}


  openMenu() {
    this.menuCtrl.open();
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
