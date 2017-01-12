import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        // real case for authorization check  
        // if (localStorage.getItem('currentUser')) {
        //     return true;
        // }
 
        // // not logged in so redirect to login page
        // this.router.navigate(['/login']);
        // return false;

        //Example allow routing for all the pages;
        return true;
    }
}