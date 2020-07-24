import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';
import { LoaderService } from '../loader.service';
import { FirebaseDbService } from '../firebase-db.service';

@Component({
  selector: 'app-wallet-history-details',
  templateUrl: './wallet-history-details.page.html',
  styleUrls: ['./wallet-history-details.page.scss'],
})
export class WalletHistoryDetailsPage implements OnInit {

  walletHistory;
  constructor(public router:Router,
    public firebase:FirebaseDbService,
    public httpService:HttpServiceService,public userService:UserService,public alertService:AlertService,
    public loaderService:LoaderService, 
    ) {
      this.walletHistory=JSON.parse(localStorage.getItem('walletHistoryDetails'))
      console.log(this.walletHistory)
     }

  ngOnInit() { this.loaderService.hideLoader();
   
  }
  getSupport(data)
  {
    console.log(data)
    this.loaderService.showLoader('');
    data['subject']='Issue with '+data['type']
    data.createdAt = new Date().toISOString()
    this.firebase.addData('tickets',data).then(res=>{
      console.log(res['id'])
       let json=data;  
        json={
        conversationId:res['id'],
        isUser:false,
        forwardedToAgent:false,
        subject: 'Issue with '+data['type'],
        userId:this.userService.getUserId(),
        message:"Hi Please select your issue",
        status:1,
        createdAt:new Date().getTime()
      }
      this.firebase.addData('conversation',json).then(
        res1=>{
          data['id']=res['id']
          localStorage.setItem('conversation', JSON.stringify(data));
          this.router.navigate(['/conversation-details'])
          this.loaderService.hideLoader()
        }
      )
      
    })
    
    
  }
}

