import { Component, OnInit, ViewChild,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
declare var google;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map;
  @ViewChild('mapElement',{static:true}) mapElement;
  autocompleteItems;
  autocomplete;

  latitude: number = 0;
  longitude: number = 0;
  geo: any

  service = new google.maps.places.AutocompleteService();
  constructor(public zone:NgZone,public router:Router,public loader:LoaderService) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
   }

  ngOnInit() { 
     this.loader.hideLoader();
    
  }

  chooseItem(item: any) {
    // this.viewCtrl.dismiss(item);
    console.log(item)
    this.geo = item;
    console.log(this.geo)
    this.autocomplete.query=item;
    console.log(this.autocomplete.query)
    this.geoCode(this.geo);//convert Address to lat and long

    this.autocompleteItems=[];
  }

  updateSearch() {
console.log(this.autocomplete)
    if (this.autocomplete.query == '') {
     this.autocompleteItems = [];
     return;
    }

    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query,
    componentRestrictions: {
      country: 'in'
    }
   }, (predictions, status) => {
     me.autocompleteItems = [];

   me.zone.run(() => {
     console.log(predictions)
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }

  //convert Address string to lat and long
  geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    this.loader.showLoader('loading map').then(()=>{
      geocoder.geocode({ 'address': address }, (results, status) => {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          {
            center: {lat: this.latitude, lng: this.longitude},
            zoom: 15
          });
        localStorage.setItem('searchLat',this.latitude+'');
        localStorage.setItem('searchAddress',address+'');
        localStorage.setItem('searchLng',this.longitude+'');
        this.autocompleteItems=[];
        this.loader.hideLoader();
       },(err)=>{
         console.log(err)
        this.loader.hideLoader();
       });
    })
    
 }

 dismiss(){
   this.router.navigateByUrl(localStorage.getItem('url'))
 }

}
