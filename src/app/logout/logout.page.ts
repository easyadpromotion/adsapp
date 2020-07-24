import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public router:Router) { 
    localStorage.removeItem('userData')
    this.router.navigateByUrl('/login')
  }

  ngOnInit() {
    localStorage.removeItem('userData')
    this.router.navigateByUrl('/login')
  }

  ionViewWillEnter() {
    localStorage.removeItem('userData')
    this.router.navigateByUrl('/login')
  }

}
