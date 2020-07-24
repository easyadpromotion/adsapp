import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { AlertService } from '../alert.service';
import { UtilService } from '../util.service';
import { UserService } from '../user.service';
import { LoaderService } from '../loader.service';
import { FirebaseDbService } from '../firebase-db.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  json:any=[]
  action='Opened'

  constructor(private router: Router, 
    public httpService: HttpServiceService, public alertService: AlertService,
    public util:UtilService,public userService:UserService,
    public firebase:FirebaseDbService,
    public loaderService: LoaderService) { }

  ngOnInit() {
    this.firebase.readDataCond('tickets').snapshotChanges().subscribe(res=>{
      this.json=[];
      res.forEach(item=>{
        this.json.push(item.payload.doc.data())
      })
      console.log(this.json)
      this.loaderService.hideLoader()
    })
  }

  openTickets(){
    this.action='Opened'
  }

  closedTickets(){
    this.action='Closed';
  }

  conversationList(data){
    localStorage.setItem('conversation', JSON.stringify(data));
    this.router.navigate(['/conversation-details'])
  }
}
