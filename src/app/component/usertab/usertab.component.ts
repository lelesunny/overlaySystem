import { Component, Input, Output, EventEmitter, SimpleChange, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
    selector: 'user-tab',
    templateUrl: './usertab.component.html',
    styleUrls: ['./usertab.component.css']
})
export class UsertabComponent implements OnInit {
    User = ""
    private isAdmin: boolean;
    ngOnInit() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.User = currentUser.username;
            if (currentUser.role == "admin") {
                this.isAdmin = true;
            }
        } else {
            return false;
        }

    }
    constructor(private router: Router) { }
    

}
