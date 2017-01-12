import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, UserService } from '../_services/index';


@Component({
    selector: 'bc-nav-menu',
    templateUrl: './navmenu.html',
    styleUrls: ['./navmenu.css']
})

export class NavMenu implements OnInit {
    private navUser: any;
    private isAdmin: boolean;
    role = ""
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userservice: UserService
    ) { }

    ngOnInit() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.role = currentUser.role;
            if (this.role == "admin") {
                this.isAdmin = true;
            }
        } else {
            return false;
        }
    }



}
