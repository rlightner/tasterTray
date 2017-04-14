import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { Http } from '@angular/http';

import {UserService} from "../providers/user-service";
import {UntappdService} from "../providers/untappd-service";

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Dialogs } from '@ionic-native/dialogs';

import { TasterTray } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    TasterTray,
    HomePage,
    ListPage, 
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TasterTray),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TasterTray,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    Http,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Dialogs,
    UserService,
    UntappdService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
