import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Injectable()
export class UserService {
    authToken: string;

    HAS_LOGGED_IN = 'hasLoggedIn';

    constructor(
        public events: Events,
        public storage: Storage
    ) {
        // NoOp
    }

    public login(): void {

        this.untappdLogin().then(() => {
            this.storage.set(this.HAS_LOGGED_IN, true);
            this.events.publish('user:login');
        }).catch(() => {
            this.events.publish('user:login-error');
        });

    }

    private untappdLogin(): Promise<any> {
        return new Promise(function (resolve, reject) {
            //81AB43AA4432874575EF098E181471B1739FFED4
            //81AB43AA4432874575EF098E181471B1739FFED4
            const url = `https://untappd.com/oauth/authenticate/?client_id=${'066B2A1F914F9DAED8DD3DFB49B2D6D77CF796C5'}&response_type=token&redirect_url=http://localhost/callback`;

            const inAppBrowser: InAppBrowser = new InAppBrowser();

            const browser = inAppBrowser.create(url, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');

            const sub = browser
                .on("loadstart").subscribe((event) => {
                    //this.dialogs.alert(event.url);

                    if ((event.url).indexOf("http://localhost/callback") === 0) {

                        sub.unsubscribe();
                        browser.close();

                        var responseParams = ((event.url).split("#")[1]).split("&");
                        var parsedResponse = {};

                        for (var i = 0; i < responseParams.length; i++) {
                            parsedResponse[responseParams[i].split("=")[0]] = responseParams[i].split("=")[1];
                        }

                        if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                            resolve(parsedResponse["access_token"]);
                        } else {
                            reject("No Token Found");
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


}