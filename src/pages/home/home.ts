import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';

import { UserService, User } from "../../providers/user-service";
import { UntappdService } from "../../providers/untappd-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checkins: any = [];
  currentUser: User;

  constructor(
    public navCtrl: NavController,
    private auth: UserService,
    private untappd: UntappdService,
    private platform: Platform,
    private dialogs: Dialogs
  ) {
    this.auth.getCurrentUser().then((user) => {
        this.currentUser = user;
        this.untappd.setAccessToken(user.authToken);

        this.getLatestActivityFeed();
    });
  }

  doRefresh(refresher) {

    this.untappd.getUserActivityFeed().subscribe(data => {
      this.checkins = data.response.checkins.items;
      refresher.complete();
    });
  
  }

  getLatestActivityFeed() {
    this.untappd.getUserActivityFeed().subscribe(data => {
      this.checkins = data.response.checkins.items;
    });
  }


loadMoreCheckins(event) {
}


  ionViewDidLoad() {
    //47.608013, -122.335167
  }
}
