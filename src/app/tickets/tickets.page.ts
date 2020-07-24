import { Component, OnInit } from '@angular/core';
import { FirebaseDbService } from '../firebase-db.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  json=[];
  action='Opened';
  constructor(public firebase:FirebaseDbService,public userService:UserService,
    public router:Router,public loaderService:LoaderService) { }
  
  ngOnInit() {
    let fb=this.firebase.getDb().collection('tickets', ref =>
    ref.where('userId', '==', this.userService.getUserId())
  ).snapshotChanges().subscribe(res=>{
    this.json=[];
    res.forEach(item=>{
      this.json.push(item.payload.doc.data());
    })
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
    data['conversationId']=data['id']
    localStorage.setItem('conversation', JSON.stringify(data));
    this.router.navigate(['/conversation-details'])
  }

}
