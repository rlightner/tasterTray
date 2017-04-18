import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { HomePage } from "../home/home";

import { UserService } from "../../providers/user-service";

import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    private navCtrl: NavController,
    private user: UserService,
    private platform: Platform, private dialog: Dialogs
  ) { }

  onLogin() {

    // if (this.platform.is("mobileweb")) {
    //   this.dialog.alert("mobile web").then(() => {
    //     this.user.loginBrowser().then(() => {
    //       this.navCtrl.setRoot(HomePage);
    //     });
    //   });

    // } else {
      console.log("hi");

      //this.dialog.alert("hi");

      // this.dialog.alert("not mobile web").then(() => {
         this.user.login().then(() => {
           this.navCtrl.setRoot(HomePage);
         });
      // });
    //}


  }
}