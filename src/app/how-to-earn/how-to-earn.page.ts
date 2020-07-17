import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-how-to-earn',
  templateUrl: './how-to-earn.page.html',
  styleUrls: ['./how-to-earn.page.scss'],
})
export class HowToEarnPage implements OnInit {

  constructor(public loaderService:LoaderService) { }

  ngOnInit() { this.loaderService.hideLoader();
    this.loaderService.hideLoader()
  }

}
