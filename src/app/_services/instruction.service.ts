import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app.config';


import { AuthenticationService } from './authentication.service';

import { User } from '../_models/index';

@Injectable()
export class InstructionService {
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
        this.headers.delete('Authorization');
        this.headers.append('Content-Type', 'multipart/form-data');
        this.headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
        this.options = new RequestOptions({ headers: this.headers });
    }
    private url = this.config.apiEndpoint;
    private labUrl = this.url + '/api/a/labs';




    uploadFileService(id: string, data): Observable<any> {
        console.log("http get this 1:", id)
        console.log("http get this 2 :", data)

        this.setHeaders();
        let formData: FormData = new FormData();

        formData.append('instructions', data[0], data[0].name)

        return this.http.post(`${this.labUrl}/${id}/instructions`, formData, this.options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


}