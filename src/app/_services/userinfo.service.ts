
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { APP_CONFIG, AppConfig } from '../app.config';

import { User } from '../_models/index';

@Injectable()
export class UserInfoService {
    private token: string;
    private headers: Headers;
    private options: RequestOptions;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService,
        @Inject(APP_CONFIG) private config: AppConfig
    ) {
        this.headers = new Headers();
        this.options = new RequestOptions();
    }
    private setHeaders(): void {
        this.headers.delete('Content-Type');
        this.headers.delete('Accept');
        this.headers.delete('Authorization');
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
        this.options = new RequestOptions({ headers: this.headers });
    }
    private url = this.config.apiEndpoint;
    private getUserTagsUrl = this.url + '/api/u/tags';
    private getUserHistoryUrl = this.url + '/api/u/history';
    // https://ravellotom.us-east-1.elasticbeanstalk.com/api/u/userlabs/1315/info
    private getUserLabInfoUrl = this.url + '/api/u/userlabs';
    private getSupportUrl = this.url + '/api/u/support/email';

    getUserTag(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getUserTagsUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getUserHistory(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getUserHistoryUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getUserLabInfo(id: string, action): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getUserLabInfoUrl}/${id}/${action}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getSupport(action): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getSupportUrl}/${action}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError)
    }
    postSupport(data): Observable<any> {
        this.setHeaders();
        return this.http.post(`${this.getSupportUrl}`, data, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError)
    }    // createUser(data): Observable<User[]> {
    //     this.setHeaders();
    //     return this.http.post(`${this.createUserUrl}`, data, this.options)
    //         .map((response: Response) => { response; })
    //         .catch(this.handleError); //...errors if any
    // }
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}