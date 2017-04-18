import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Storage } from '@ionic/storage';
//import { UserService } from "./user-service";
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class UntappdService {

    private clientId: string = "066B2A1F914F9DAED8DD3DFB49B2D6D77CF796C5";
    private clientSecret: string = "D6DC260C566AA36158C2405A9D22813475A5E63F";
    private accessToken: string = null;

    private rootUrl: string = "https://api.untappd.com/v4";

    constructor(
        private http: Http
        //private user: UserService
    ) { }

    public getActivityFeed(): any {

        //return Observable.of(this.checkins);

        // return this.http.get(`${this.rootUrl}/checkin/recent`, { params: { "access_token": "81AB43AA4432874575EF098E181471B1739FFED4" } })
        //     .do(this.logResponse)
        //     .map(this.extractData)
        //     .catch(this.catchError);

    }

    public setAccessToken(value: string): void {
        this.accessToken = value;
    }


    public getMyInfo(): Observable<any> {
        const params = {};
        
        params["access_token"] = this.accessToken;
        
        var url: string = `${this.rootUrl}/user/info`;

        return this.http
            .get(url, {
                params: params
            })
            .map(this.extractData)
            .do(this.logResponse)
            .catch(this.catchError);
    }

    public getUserInfo(username: string): Observable<any> {
        const params = {};
        var url: string;

        if (this.accessToken === null) {
            params["client_id"] = this.clientId;
            params["client_secret"] = this.clientSecret;
            url = `${this.rootUrl}/user/info/${username}`;
        } else {
            params["access_token"] = this.accessToken;
            url = `${this.rootUrl}/user/info`;
        }

        return this.http
            .get(url, {
                params: params
            })
            .map(this.extractData)
            .do(this.logResponse)
            .catch(this.catchError);
    }

    getUserActivityFeed(maxId?: number): any {
        const params = {};

        //this.user.getUserToken().then(token => this.accessToken = token);

        if (this.accessToken == null) {
            params["client_id"] = this.clientId;
            params["client_secret"] = this.clientSecret;
        } else {
            params["access_token"] = this.accessToken;
        }

        return this.http
            .get(`${this.rootUrl}/user/checkins`, {
                params: params
            })
            .map(this.extractData)
            .catch(this.catchError);
    }

    private catchError(error: Response | any) {
        console.log(error);
        return Observable.throw(error.json().error || "Server error.");
    }

    private logResponse(res: Response) {
        console.log(res);
    }
    private extractData(res: Response) {
        return res.json();
    }
}
