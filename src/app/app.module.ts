//import * as Raven from 'raven-js';
import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { UserService } from "../providers/user-service";
import { UntappdService } from "../providers/untappd-service";

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Dialogs } from '@ionic-native/dialogs';

import { TasterTray } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Ionic2RatingModule } from 'ionic2-rating';

// Raven
//   .config('https://d3a97d05bff344c080f508a824b3ee4e@sentry.io/159072')
//   .install();

// export class RavenErrorHandler implements ErrorHandler {
//   handleError(err: any): void {
//     Raven.captureException(err.originalError);
//   }
// }

@NgModule({
  declarations: [
    TasterTray,
    HomePage,
    ListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(TasterTray),
    IonicStorageModule.forRoot(),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TasterTray,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Dialogs,
    UserService,
    UntappdService,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
    //{ provide: ErrorHandler, useClass: RavenErrorHandler }
  ]
})
export class AppModule { }
