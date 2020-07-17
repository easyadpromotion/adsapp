import { Injectable } from '@angular/core';
import {MenuController} from "@ionic/angular";
import {HttpServiceService} from "./http-service.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public menu: MenuController,public http:HttpServiceService) {

  }
  toggleMenu=()=>{
    alert(this.menu.isOpen())
    if(this.menu.isEnabled()){
      this.menu.enable(false);
      this.menu.close()
    }else{
      this.menu.enable(true);
      this.menu.open()
    }
  }

  getTenantCode(){
    return localStorage.getItem('tenantCode')===null?false:localStorage.getItem('tenantCode');
  }

  getTenant(){
    return localStorage.getItem('tenant')===null?false:JSON.parse(localStorage.getItem('tenant'));
  }

  getLocation(){
    return localStorage.getItem('location')===null?false:JSON.parse(localStorage.getItem('location'));
  }

  getTenantId(){
    return localStorage.getItem('location')===null?false:JSON.parse(localStorage.getItem('tenant'))['_id'];
  }

  getLogo(){
    let logo=this.getTenant()['logo'];
    if(logo){
      return this.http.imageUrl+this.getTenant()['logo'];
    }else{
      return false;
    }

  }

  getTenantName(){
    return localStorage.getItem('location')===null?false:JSON.parse(localStorage.getItem('tenant'))['tenantName']
  }

  storeTenantCode(value){
    localStorage.setItem('tenantCode',value);
  }

  storeTenant(value){
    localStorage.setItem('tenant',JSON.stringify(value));
  }

  storeLocation(value){
    localStorage.setItem('location',JSON.stringify(value));
  }

  storeDevice(value){
    localStorage.setItem('device',JSON.stringify(value));
  }

  getDevice(){
    return JSON.parse(localStorage.getItem('device'))
  }

  checkLoggedIn(){
    return localStorage.getItem('loggedIn')===null?false:localStorage.getItem('loggedIn');
  }

  getDeviceId(){
    return this.getDevice()['_id'];
  }

  getAreaCode(){
    return this.getDevice()['area'];
  }

  getThemeColor(){
    return this.getTenant()['theme'];
  }

  checkPassCode(value){
    return this.getDevice()['passCode']==value;
  }
}
