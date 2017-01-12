import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../_services/index';

@Component({
    templateUrl: './ssologinsuc.component.html',
    styleUrls: ['./ssologinsuc.component.css']
})

export class SSOLoginSucComponent implements OnInit {
    title = "Nebula Cloud Labs SSO Login"
    model: any = {};
    loading = false;
    error = '';
    private currentUser: any;
    // private role:any;
    // public showmenu: boolean = false;
    // @Output() onvisible: EventEmitter<any> = new EventEmitter();


    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();
        this.SSOSuccessLogin();



    }

    SSOSuccessLogin() {
        let self = this;
        this.authenticationService.SSOSuccessLogin().subscribe(result => {
            if (result === true) {
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                // check if the current user is general user or admin
                if (self.currentUser && this.currentUser.role == "user") {
                    // 2 is general user
                    self.router.navigate(['/home']);
                } else if (self.currentUser && this.currentUser.role == "admin"){
                    // 1 is admin user
                     self.router.navigate(['/admin/home'])
                    
                }else{
                    return false;
                }
                // self.redo()
            }
        }, error => {
            self.error = 'Single Sign On ERROR';
            // self.loading = false;
        });
            
       
        
    }

    redo() {
        window.location.reload();
    }
}
