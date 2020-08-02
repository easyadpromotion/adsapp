import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { AlertService } from '../alert.service';
import { UtilService } from '../util.service';
import { UserService } from '../user.service';
import { LoaderService } from '../loader.service';
import { FirebaseDbService } from '../firebase-db.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.page.html',
  styleUrls: ['./conversation-details.page.scss'],
})
export class ConversationDetailsPage implements OnInit {

  conversation:any={};
  ticketDetails:any={}
  editAccess
  message =[]
  coversationdata:any={}
  allConversations:any=[]
  userText='';
  bot=true;
  selection=true;
  // @ViewChild('content') private content: any;
  @ViewChild('content', { static: false }) content:any
  constructor(private router:Router,
    public httpService:HttpServiceService, public alertService:AlertService,
    public util:UtilService,public userService: UserService,public firebase:FirebaseDbService,
    public loaderService:LoaderService) { 
      
    }

    ngOnInit() { 
    }

    ionViewWillEnter(){
      this.conversation = JSON.parse(localStorage.getItem('conversation'))
      this.conversation['conversationId']=this.conversation['id']
      console.log('c',this.conversation)
      this.loaderService.hideLoader()
      let fb=this.firebase.getDb().collection('conversation', ref =>
      ref.where('conversationId', '==', this.conversation['id'])
    ).snapshotChanges().subscribe(res=>{
      
      this.allConversations=[];
      res.forEach(item=>{
        this.allConversations.push(item.payload.doc.data());
        console.log(item.payload.doc.data())
        if(item.payload.doc.data()['forwardedToAgent']){
          this.bot=false;
          this.selection=false;
          
        }
        console.log(this.content.nativeElement)
        
        setTimeout(()=>{
          let el=this.content.nativeElement;
          el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
        },500)
        
      })
      
      setTimeout(()=>{
        this.allConversations.sort((a,b)=>{
          // return a.createdAt<b.createdAt
          if (a.createdAt<b.createdAt) {
            return -1;
          } else if (a.createdAt<b.createdAt) {
            return 1;
          }
        })
        console.log('sorted',this.allConversations)
      })
      
     
      // this.allConversations.reverse();
      console.log(res,this.allConversations)
    })

    }

    sendMessage(userText){
      if(userText){
        let json={
          conversationId:this.conversation['conversationId'],
          isUser:true,
          forwardedToAgent:false,
          userId:this.userService.getUserId(),
          message:userText,
          createdAt:new Date().getTime()
        }
        this.firebase.addData('conversation',json)
        this.userText="";
      }
    
    }

    connectToAgent(){
      
      let json:any={
        conversationId:this.conversation['conversationId'],
        isUser:true,
        forwardedToAgent:true,
        userId:this.userService.getUserId(),
        message:"Please wait our agent will connect shortly",
        messageId:5,
        createdAt:new Date().getTime()
        
      }
      this.firebase.addData('conversation',json).then(()=>{})
    }

    sendBotMessage(text){
      if(text=='Cannot Redeem Amount'){
        this.selection=false;
        let json:any={
          conversationId:this.conversation['conversationId'],
          isUser:true,
          forwardedToAgent:false,
          userId:this.userService.getUserId(),
          message:"Cannot Redeem Amount",
          createdAt:new Date().getTime()
        }
        this.firebase.addData('conversation',json).then(()=>{
         setTimeout(()=>{
          json={
            conversationId:this.conversation['conversationId'],
            isUser:false,
            forwardedToAgent:false,
            userId:this.userService.getUserId(),
            messageId:1,
            message:"Make sure your wallet have minimum 100rs",
            createdAt:new Date().getTime()
          }
          this.firebase.addData('conversation',json)
          this.userText="";
          },1000)

          setTimeout(()=>{
            json={
              conversationId:this.conversation['conversationId'],
              isUser:true,
              forwardedToAgent:false,
              userId:this.userService.getUserId(),
              message:"Not helpful, Connect to agent?",
              messageId:4,
              createdAt:new Date().getTime()
            }
            this.firebase.addData('conversation',json)
          },1500);

         });    
        
     
      }
      if(text=='Cannot Change Password'){
        this.selection=false;
        let json:any={
          conversationId:this.conversation['conversationId'],
          isUser:true,
          forwardedToAgent:false,
          userId:this.userService.getUserId(),
          message:"Cannot Change Password",
          messageId:3,
          createdAt:new Date().getTime()
          
        }
        this.firebase.addData('conversation',json).then(()=>{
          setTimeout(()=>{
            json={
              conversationId:this.conversation['conversationId'],
              isUser:false,
              forwardedToAgent:false,
              userId:this.userService.getUserId(),
              message:"Open profile and change password",
              messageId:2,
              createdAt:new Date().getTime()
            }
            this.firebase.addData('conversation',json)
          },1000);

          setTimeout(()=>{
            json={
              conversationId:this.conversation['conversationId'],
              isUser:true,
              forwardedToAgent:false,
              userId:this.userService.getUserId(),
              message:"Not helpful, Connect to agent?",
              messageId:4,
              createdAt:new Date().getTime()
            }
            this.firebase.addData('conversation',json)
          },1500);
          
          this.userText="";
        })
       
      }
    }

}
