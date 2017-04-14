import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from "../home/home";

import { UserService } from "../../providers/user-service";


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    private navCtrl: NavController,
    private user: UserService
  ) { }

  onLogin() {
    this.user.login();
    this.navCtrl.push(HomePage);
  }
}