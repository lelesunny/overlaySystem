import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app.config';


import { AuthenticationService } from './authentication.service';

import { User } from '../_models/index';

@Injectable()
export class UserService {
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
    private getUsersUrl = this.url + '/api/a/users';
    private createUserUrl = this.url + '/api/a/users';
    private getTimeZoneUrl = this.url + '/api/a/users/timezones';
    private getTemplatesUrl = this.url + '/api/a/labs/templates';
    private createBulkJobUrl = this.url + '/api/a/bulkjobs';
    private getBulkListUrl = this.url + '/api/a/bulkjobs';
    private getRegionsUrl = this.url + '/api/a/bulkjobs/regions';
    private getUserRegionsUrl = this.url + '/api/u/labs/regions';
    private getUserTimeZoneUrl = this.url + '/api/u/labs/timezones';
    private getBulkCreateTemplatesUrl = this.url + '/api/a/bulkjobs/templates';
    private postUserLabScheduleUrl = this.url + '/api/u/labs';


    getUsers(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getUsersUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    createUser(data): Observable<User[]> {
        this.setHeaders();
        return this.http.post(`${this.createUserUrl}`, data, this.options)
            .map((response: Response) => { response; })
            .catch(this.handleError); 
    }
    postUserLabSchedule(id:string,action,data): Observable<User[]> {
        this.setHeaders();
        return this.http.post(`${this.postUserLabScheduleUrl}/${id}/${action}`, data, this.options)
            .map((response: Response) => { response; })
            .catch(this.handleError); 
    }
    getTimeZone(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getTimeZoneUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getTemplates(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getTemplatesUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getBulkCreateTemplates(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getBulkCreateTemplatesUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    createBulkJob(data): Observable<any> {
        this.setHeaders();
        return this.http.post(`${this.createBulkJobUrl}`, data, this.options)
            .map((response: Response) => { response; })
            .catch(this.handleError);
    }
    getBulkList(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getBulkListUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getBulkUserLab(id: string): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getBulkListUrl}/${id}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getRegions(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getRegionsUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getUserRegions(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getUserRegionsUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getUserTimeZone(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getUserTimeZoneUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getUserHistory(id: string): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getUsersUrl}/${id}/history`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
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