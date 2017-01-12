import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/index';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    private currentUser: any;
    private paramsSub: any;
    // private role:any;
    // public showmenu: boolean = false;
    // @Output() onvisible: EventEmitter<any> = new EventEmitter();


    constructor(
        private router: Router, private activatedRoute: ActivatedRoute,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.role = this.currentUser.role;
        // console.log("asd",this.role)
        // this.redo();
        this.model.username = 'test@lab.com';
        //console.log(this.activatedRoute);
        this.paramsSub = this.activatedRoute.queryParams.subscribe(queryparams => {
            this.model.username = queryparams['username'];
        });

    }

    login() {
        let self = this;
        self.loading = true;

        // self.authenticationService.login(self.model.username, self.model.password)
        //     .subscribe(result => {
        //         if (result === true) {
        //             this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //             // check if the current user is general user or admin
        //             if (self.currentUser && this.currentUser.role == "user") {
        //                 // 2 is general user
        //                 self.router.navigate(['/home']);
        //             } else {
        //                 // 1 is admin user
        //                 self.router.navigate(['/admin/home'])
        //             }
        //             // self.redo()
        //         } else {
        //         }
        //     }, error => {
        //             self.error = 'Username or password is incorrect';
        //             self.loading = false;
        //     });

        // ONLY FOR LOCAL EXAMPLE
        if (self.model.username, self.model.password === "user") {
            localStorage.setItem('currentUser', JSON.stringify({ username: "user", role: "user" }));

            self.router.navigate(['/home']);
        } else if (self.model.username, self.model.password === "admin") {
            localStorage.setItem('currentUser', JSON.stringify({ username: "admin", role: "admin" }));
            self.router.navigate(['/admin/home'])

        }



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

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }
}
