import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { UntappdService } from './untappd-service';

export class User {
    name: string;
    email: string;
    authToken: string;

    constructor(name: string, email: string, authToken: string) {
        this.name = name;
        this.email = email;
        this.authToken = authToken;
    }
}

@Injectable()
export class UserService {
    currentUser: User;
    HAS_LOGGED_IN = 'hasLoggedIn';

    constructor(
        private events: Events,
        private storage: Storage,
        private geo: Geolocation,
        private untappd: UntappdService
    ) {
        // NoOp
    }

    public login(): Promise<any> {
        const self = this;

        return new Promise(function (resolve, reject) {

            self.untappdLogin().then((authToken) => {

                self.untappd.setAccessToken(authToken);

                self.untappd.getMyInfo().subscribe((untappdUser) => {
                    self.currentUser = new User(untappdUser.response.user.user_name, untappdUser.response.user.settings.email_address, authToken);
                    self.storage.set("currentUser", self.currentUser);
                    self.storage.set(self.HAS_LOGGED_IN, true);
                    self.events.publish('user:login');

                    resolve(true);
                });

            }).catch(() => {

                self.events.publish('user:login-error');
                
                reject();

            });

        });
    }

    public loginBrowser(): Promise<any> {
        const self = this;

        self.untappd.setAccessToken("81AB43AA4432874575EF098E181471B1739FFED4");

        return new Promise(function (resolve, reject) {

            self.untappd.getMyInfo().subscribe((untappdUser) => {
                console.log("untappdUser:", untappdUser);

                self.currentUser = new User(untappdUser.response.user.user_name, untappdUser.response.user.settings.email_address, "81AB43AA4432874575EF098E181471B1739FFED4");
                self.storage.set("currentUser", self.currentUser);
                self.storage.set(self.HAS_LOGGED_IN, true);

                self.events.publish('user:login');

                resolve();
            });
        });

    }

    private untappdLogin(): Promise<any> {

        return new Promise(function (resolve, reject) {
            //81AB43AA4432874575EF098E181471B1739FFED4
            //81AB43AA4432874575EF098E181471B1739FFED4
            const url = `https://untappd.com/oauth/authenticate/?client_id=${'066B2A1F914F9DAED8DD3DFB49B2D6D77CF796C5'}&response_type=token&redirect_url=http://localhost:8000/callback`;

            const inAppBrowser: InAppBrowser = new InAppBrowser();

            const browser = inAppBrowser.create(url, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');

            const sub = browser
                .on("loadstart").subscribe((event) => {
                    //this.dialogs.alert(event.url);
                    console.log("event.url: ", event.url);

                    if ((event.url).indexOf("http://localhost:8000/callback") === 0) {

                        sub.unsubscribe();
                        browser.close();

                        var responseParams = ((event.url).split("#")[1]).split("&");
                        var parsedResponse = {};

                        for (var i = 0; i < responseParams.length; i++) {
                            parsedResponse[responseParams[i].split("=")[0]] = responseParams[i].split("=")[1];
                        }

                        if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                            //this.setUserToken(parsedResponse["access_token"]);
                            resolve(parsedResponse["access_token"]);
                        } else {
                            reject(null);
                        }

                    }

                }, err => {
                    console.log(err);
                    //this.dialogs.alert(err);
                }, () => {
                    //this.dialogs.alert("success outside?");
                    console.log("success");
                });

        });
    }

    public getCurrentUser(): Promise<User> {
        return this.storage.get("currentUser").then((user: User) => {
            return user;
        });
    }

    public logout(): void {
        this.storage.remove(this.HAS_LOGGED_IN);
        this.storage.remove('username');
        this.storage.remove('accessToken');
        this.events.publish('user:logout');
    }

    setUsername(username: string): void {
        this.storage.set('username', username);
    };

    getUsername(): Promise<string> {
        return this.storage.get('username').then((value) => {
            return value;
        });
    };

    setUserToken(userToken: string): void {
        this.storage.set("accessToken", userToken);
    };

    getUserToken(): Promise<string> {
        return this.storage.get("accessToken").then((value) => {
            return value;
        });
    };

    hasLoggedIn(): Promise<boolean> {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value === true;
        });
    };

    userLocation(): Promise<any> {
        return this.storage.get("userLocation").then((loc) => {
            if (loc === null) {
                this.geo.getCurrentPosition().then((resp) => {
                    const latLng = [resp.coords.latitude, resp.coords.longitude];
                    this.storage.set("userLocation", latLng);
                    return latLng;
                });
            }
            return loc;
        });
    }


}