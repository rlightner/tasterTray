import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';

import { UserService } from "../../providers/user-service";
import { UntappdService } from "../../providers/untappd-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checkins: any = [];

  constructor(
    public navCtrl: NavController,
    private auth: UserService,
    private untappd: UntappdService,
    private platform: Platform,
    private dialogs: Dialogs
  ) { }

  ionViewDidLoad() {
    //47.608013, -122.335167
    this.untappd.getActivityFeed().subscribe(data => {
      console.log("getActivityFeed", data);
    });

  }


}
