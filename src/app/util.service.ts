import { Injectable } from '@angular/core';
import * as moment from "moment";
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  convertTime(time){
 
    var date = new Date(time * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  }
  createdAt(time){
    var date=new Date(time );
    return moment(date.toISOString().split('T')[0]).format('DD-MM-YYYY');
  }

  generateOtp() {
    return Math.floor(1000 + Math.random() * 9000)
  }

  generateSMSOTP() { 
          
    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
  } 

  enableFromValidation(form) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({onlySelf: true});
    })
  }
}
