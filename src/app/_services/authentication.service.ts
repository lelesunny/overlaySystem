import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { APP_CONFIG, AppConfig } from '../app.config';



@Injectable()
export class AuthenticationService {
    public token: string;
    private url = this.config.apiEndpoint;
    private loginUrl = this.url + '/api/login';
    private SSOLoginUrl = this.url + '/api/ssologin';
    private SSOSuccessLoginUrl = this.url + '/api/ssotoken';
    private logoutURL = this.url + '/api/logout'




    constructor(
        private http: Http,
        @Inject(APP_CONFIG) private config: AppConfig
    ) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username, password): Observable<boolean> {
        var headers = new Headers();
        headers.delete('Content-Type');
        headers.delete('Accept');
        headers.delete('Authorization');
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        //  headers.append('Access-Control-Al low-Origin', '*');

        return this.http.post(`${this.loginUrl}`, {}, { headers: headers }).map((response: Response) => {
            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().token;
            let role = response.json().role;
            if (token) {
                // set token property
                this.token = token;

                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, role: role }));

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        }).catch(this.handleError);
    }
    ssoLogin(username): Observable<boolean> {
        var headers = new Headers();
        headers.delete('Content-Type');
        headers.delete('Accept');
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({ headers: headers });

        let data = "username=" + username;
        console.log('Testing...' + data);

        return this.http.post(`${this.SSOLoginUrl}`, data, options).map((response: Response) => {

            console.log(response)
            return true;
        }).catch(this.handleError);
    }
    SSOSuccessLogin(): Observable<boolean> {
        var headers = new Headers();
        // headers.delete('Content-Type');
        // headers.delete('Accept');
        headers.append('Accept', 'application/json');
        headers.append('origin', this.url);
        // headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({ headers: headers,withCredentials:true });

        return this.http.post(`${this.SSOSuccessLoginUrl}`, {}, options).map((response: Response) => {
            let token = response.json() && response.json().token;
            let username = response.json().username;
            let role = response.json().role;
            if (token) {
                // set token property
                this.token = token;

                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, role: role }));

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        }).catch(this.handleError);
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



    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

   logoutServer(): Observable<any> {
        var headers = new Headers();
        headers.delete('Content-Type');
        headers.delete('Accept');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token);
        let options = new RequestOptions({ headers: headers });


        return this.http.get(`${this.logoutURL}`, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
            
    }
    
}