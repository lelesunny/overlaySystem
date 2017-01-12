import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../_services/index';

@Component({
    templateUrl: './postlogin.component.html',
    styleUrls: ['./postlogin.component.css']
})

export class PostLoginComponent implements OnInit {
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
        // reset login status
        this.authenticationService.logout();
        // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.role = this.currentUser.role;
        // console.log("asd",this.role)
        // this.redo();

    }
    public validateForm(){
        let formData = document.forms["form"]["username"].value;
        if(formData == ""){
            return false;
        }
    }

    login() {
        console.log(this.model)
        let self = this;
        self.loading = true;
        self.authenticationService.ssoLogin(self.model.username)
            .subscribe(result => {
                if (result === true) {

                    // self.router.navigate(['/home']);
                    console.log("result is ",result)

                } else {
                }
            }, error => {
                self.error = 'ERROR..........';
                self.loading = false;
            });
    }
    // change($event) {



    //     setTimeout(() => {
    //         self.onvisible.emit($event);
    //     }, 10);

    //     this.showmenu = true;

    // }
    redo() {
        window.location.reload();
    }
}
