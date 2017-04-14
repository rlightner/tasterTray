import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { UserService } from "./user-service";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class UntappdService {

    constructor(public http: Http, public user: UserService) {

    }

    public getActivityFeed(): any {
        //var self = this;
        //return new Promise(function (resolve, reject) {
            this.http.get('/v4/checkin/recent').map(res=>res.json());
        //});
    }

    // public getUserActivityFeed(accessToken: string): Promise<any> {


    //     return new Promise(function (resolve, reject) {
    //         this.http.get('/v4/user/checkins', { "access_token": accessToken }, {}).then(data => {
    //             resolve(data);
    //         }).catch(error => {
    //             reject(error);
    //         });
    //     })

    // }
}
