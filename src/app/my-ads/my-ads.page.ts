import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router'
import { HttpServiceService } from 'src/app/http-service.service';
import { LoaderService } from 'src/app/loader.service';
import { FirebaseDbService } from '../firebase-db.service';
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
  constructor(public menuCtrl: MenuController,public loaderService:LoaderService,
    public firebase:FirebaseDbService, public userService:UserService,private router: Router,public httpService: HttpServiceService) { }

  ngOnInit() { this.loaderService.hideLoader();
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
  let fb=this.firebase.getDb().collection('photoads', ref =>
      ref.where('userId', '==', this.userService.getUserId())
    ).snapshotChanges().subscribe(res=>{
      this.photojson=[];
      res.forEach(item=>{
        let json=item.payload.doc.data();
        json['id']=item.payload.doc.id;
        this.photojson.push(json);
      })
      fb.unsubscribe();
      console.log(res)
    })

    let vfb=this.firebase.getDb().collection('videoads', ref =>
      ref.where('userId', '==', this.userService.getUserId())
    ).snapshotChanges().subscribe(res=>{
      this.videosjson=[];
      res.forEach(item=>{
        let json=item.payload.doc.data();
        json['id']=item.payload.doc.id;
        this.videosjson.push(json);
      })
      vfb.unsubscribe();
      console.log(res)
    })

    let surfb=this.firebase.getDb().collection('surveyads', ref =>
      ref.where('userId', '==', this.userService.getUserId())
    ).snapshotChanges().subscribe(res=>{
      this.surveyjson=[];
      res.forEach(item=>{
        let json=item.payload.doc.data();
        json['id']=item.payload.doc.id;
        this.surveyjson.push(json);
      })
      surfb.unsubscribe();
      console.log(res)
    })
}


  openMenu() {
    this.menuCtrl.open();
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
