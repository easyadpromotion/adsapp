import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';
import { HttpServiceService } from '../http-service.service';
import { AlertService } from '../alert.service';
import { UserService } from '../user.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-ticket-management-add',
  templateUrl: './ticket-management-add.page.html',
  styleUrls: ['./ticket-management-add.page.scss'],
})
export class TicketManagementAddPage implements OnInit {

  
  ticketManagementForm: FormGroup;
  loading;
  coversationdata:any={}
  walletHistory:any={}
  constructor(private formBuilder:FormBuilder, private router:Router,
    public util:UtilService,
       public httpService:HttpServiceService, public alertService:AlertService,public userService: UserService,
       public loaderService:LoaderService) {

        this.walletHistory=JSON.parse(localStorage.getItem('walletHistoryDetails'))
        console.log(this.walletHistory)
        }

  ngOnInit() { this.loaderService.hideLoader();
    this.ticketManagementForm = this.formBuilder.group({     
      
      message: ['', [Validators.required]],

  });
  }

  submit(data){
    data['status'] = 0
    data['isAvailable']= '1'
    data['assignTo'] =this.getAdmin()
    data['assignFrom']= this.userService.getUserId()
    data['userId'] = this.userService.getUserId()
    data['supportType']=this.walletHistory.type
    data['subject'] = " "+this.walletHistory['creditDebit']=='1'?'Credit':'Debit'+" issue in "+ this.walletHistory.type
    console.log(data)
    this.loaderService.showLoader('Adding Please wait ..').then(()=>{
      try{
        this.httpService.postApi(data, 'ticketManagements/create').subscribe((res) => {
          this.loaderService.hideLoader();
          if(res["success"]){
            console.log(res.data)
            if(res.data['_id'])
            {
              this.coversationdata['ticketId']=res.data['_id']
              this.coversationdata['from']=this.userService.getUserId();
              this.coversationdata['to']='-'
              this.coversationdata['message']=res.data['message']
              this.coversationdata['isAvailable']=1
              this.httpService.postApi(this.coversationdata, 'conversations/create').subscribe((res1) => {
                this.loaderService.hideLoader();
                if(res1["success"]){
                  this.alertService.presentAlert('Success','Successfully added','Okay');
                  console.log(res.data)
                  localStorage.setItem('ticketDetails', JSON.stringify(res.data));
                  this.router.navigate(['/conversation-details'])
                }else{
                  this.alertService.presentAlert('Error',res["error"]["message"],'Okay');
                }    
              },(err)=>{
                
                this.loaderService.hideLoader();
                this.alertService.presentNetworkAlert();
               });
            }
            // this.alertService.presentAlert('Success','Successfully added','Okay');
           // this.router.navigate(['/ticket-management-list'])
          }else{
            this.alertService.presentAlert('Error',res["error"]["message"],'Okay');
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


  getAdmin()
  {
    return "5ef9c21e42c6fd58b4b6d9c9";
  }

}
