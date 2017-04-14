import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { UserService } from "../providers/user-service";
import { UntappdService } from "../providers/untappd-service";

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class TasterTray {
  @ViewChild(Nav) nav: Nav;

  appPages: PageInterface[] = [
    { title: "Home", name: "HomePage", component: HomePage, icon: "home" }
  ];

  loggedInPages: PageInterface[] = [
    //{ title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    //{ title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    //{ title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' }
  ];
  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public menu: MenuController,
    public user: UserService,
    public untappd: UntappdService,
    public geolocation: Geolocation
  ) {

    this.rootPage = HomePage;
    //this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];

    this.geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
}).catch((error) => {
  console.log('Error getting location', error);
});
    
    this.user.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });

    this.enableMenu(true);

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu

    if (page.index != undefined) {
      this.nav.setRoot(page.component);
      // Set the root of the nav with params if it's a tab index 
    } else {
      this.nav.setRoot(page.component);
    }

    // if (this.nav.getActiveChildNav() && page.index != undefined) {
    //   console.log(`getActiveChildNav: ${page.index}`);
    //   this.nav.getActiveChildNav().select(page.index);
    //   // Set the root of the nav with params if it's a tab index
    // } else {
    //   this.nav.setRoot(page.name, params).catch((err: any) => {
    //     console.log(`Didn't set nav root: ${err}`);
    //   });
    // }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.user.logout();
    }

    //this.nav.setRoot(HomePage);
  }

  // openTutorial() {
  //   this.nav.setRoot(TutorialPage);
  // }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabName) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;

  }



  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
}
