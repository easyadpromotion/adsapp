import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas,far,fab)// add all icons
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AgmCoreModule } from '@agm/core';
// FCM
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';



export const firebaseConfig = {
  apiKey: "AIzaSyCICpmZRqzAgVGfaQwLLcRgjSq0J_pA8wo",
  authDomain: "eap-ads.firebaseapp.com",
  databaseURL: "https://eap-ads.firebaseio.com",
  projectId: "eap-ads",
  storageBucket: "eap-ads.appspot.com",
  messagingSenderId: "756258028961",
  appId: "1:756258028961:web:43ad1dd4a454462b765fe0",
  measurementId: "G-TZJVDYH0P7"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBu6TgVVKcMEJl66ub2M1igelUXZKlT6lg'
    }),
    
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule,
      FontAwesomeModule
    
    

  ],
  providers: [
    StatusBar,
    FCM,
    Geolocation,
    SplashScreen,
    Geolocation,
    SocialSharing,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
