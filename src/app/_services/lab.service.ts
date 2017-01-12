import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app.config';


import { AuthenticationService } from './authentication.service';

import { User } from '../_models/index';

@Injectable()
export class LabService {
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
    private labUrl = this.url + '/api/a/labs';
    private userLabUrl = this.url + '/api/u/labs';
    private userRunningLabUrl = this.url + '/api/u/userlabs';
    private startUserLabUrl = this.url + '/api/u/labs';
    private adminRunningLabUrl = this.url + '/api/a/userlabs';
    private getExtendOptionUrl = this.url + '/api/u/userlabs/extendoptions';
    private getEmailTemplateUrl = this.url + '/api/a/emailtemplates';
    private deleteUserUrl = this.url + '/api/a/users';


    deleteTag(id: string): Observable<any> {
        this.setHeaders();
        return this.http.delete(`${this.deleteUserUrl}/${id}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getLabs(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.labUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    updateLabTags(data): Observable<any> {
        this.setHeaders();
        return this.http.put(`${this.labUrl}`, data, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    addNewLab(data): Observable<any> {
        this.setHeaders();
        return this.http.post(`${this.labUrl}`, data, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getUserLab(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.userLabUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getUserRunningLab(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.userRunningLabUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    startUserLab(id: string, data): Observable<any> {
        this.setHeaders();
        return this.http.post(`${this.startUserLabUrl}/${id}/start`, data, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getAllLabs(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.adminRunningLabUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    adminActionRunningLab(id: string, action: string): Observable<any> {
        this.setHeaders();
        return this.http.post(`${this.adminRunningLabUrl}/${id}/${action}`, {}, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    adminBulkSaveLab(id: string, data, action: string): Observable<any> {
        this.setHeaders();
        return this.http.post(`${this.adminRunningLabUrl}/${id}/${action}`, data, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getAdminLabInfo(id: string, action: string): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.adminRunningLabUrl}/${id}/${action}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    modifyTemplateDetail(id: string, action: string, data): Observable<any> {
        this.setHeaders();
        return this.http.post(`${this.labUrl}/${id}/data?type=${action}`, data, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getTemplateDetailData(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getEmailTemplateUrl}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    // adminDeleteRunningLab(id: string): Observable<any> {
    //     this.setHeaders();
    //     return this.http.post(`${this.adminRunningLabUrl}/${id}/delete`, {}, this.options)
    //         .map((response: Response) => response.json())
    //         .catch(this.handleError);
    // }
    userActionRunningLab(id: string, action: string, data): Observable<any> {
        this.setHeaders();
        return this.http.post(`${this.userRunningLabUrl}/${id}/${action}`, data, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getExtendOption(): Observable<any> {
        this.setHeaders();
        return this.http.get(`${this.getExtendOptionUrl}`, this.options)
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