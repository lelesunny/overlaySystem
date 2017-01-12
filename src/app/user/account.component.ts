import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserInfoService } from '../_services/index';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';



@Component({
    selector: 'user-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],

})
export class AccountComponent implements OnInit {
    private userTags: any = [{"id":123,"name":"Custom for associating with demos  ","userid":2,"tagid":15,"username":"user","created":0},{"id":84,"name":"1 running application","userid":2,"tagid":9,"username":"user","created":0},{"id":63,"name":"Beta","userid":2,"tagid":7,"username":"user","created":0},{"id":138,"name":"CN TEST","userid":2,"tagid":157,"username":"user","created":0},{"id":81,"name":"1 saved lab","userid":2,"tagid":144,"username":"user","created":0},{"id":133,"name":"Can extend 4 hour","userid":2,"tagid":143,"username":"user","created":0}];
    private userHistory: any = [];
    private history: any = [];
    private user: any;
    ngOnInit() {
        this.getUserTag();
        this.getUserHistory();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.user = currentUser.username;
        }
    }

    constructor(
        private userInfoService: UserInfoService
    ) { }
    public getUserTag() {
        this.userInfoService.getUserTag().subscribe(
            e => {
                this.userTags = e;
            }
        )
    }
    public getUserHistory() {
        let e = ["Loggedin at \u003cb\u003e2017-01-12 21:12:31\u003c/b\u003e", "Loggedin at \u003cb\u003e2017-01-12 20:27:12\u003c/b\u003e", "Loggedin at \u003cb\u003e2017-01-12 14:47:53\u003c/b\u003e", "Deleted lab \u003cb\u003euser - 2017-01-10 - Nebula Test Application\u003c/b\u003e at \u003cb\u003e2017-01-10 19:36:45\u003c/b\u003e", "Started lab \u003cb\u003euser - 2017-01-10 - Nebula Test Application\u003c/b\u003e at \u003cb\u003e2017-01-10 19:26:28\u003c/b\u003e", "Loggedin at \u003cb\u003e2016-12-05 22:16:24\u003c/b\u003e", "Started lab \u003cb\u003euser - 2016-12-05 - Nebula Test Application\u003c/b\u003e at \u003cb\u003e2016-12-05 22:15:22\u003c/b\u003e", "Started lab \u003cb\u003euser - 2016-12-05 - Nebula Test Application\u003c/b\u003e at \u003cb\u003e2016-12-05 22:15:01\u003c/b\u003e", "Loggedin at \u003cb\u003e2016-12-01 18:37:24\u003c/b\u003e", "Loggedin at \u003cb\u003e2016-12-01 18:36:25\u003c/b\u003e", "Loggedin at \u003cb\u003e2016-11-17 15:31:14\u003c/b\u003e", "Loggedin at \u003cb\u003e2016-11-17 15:26:14\u003c/b\u003e", "Loggedin at \u003cb\u003e2016-11-17 03:44:40\u003c/b\u003e"];
        let temp = e.toString().split(",")
        temp.forEach(val => {
            this.history.push({ history: val })
            this.userHistory = this.history;
        })
        // this.userInfoService.getUserHistory().subscribe(
        //     e => {
        //         let temp = e.toString().split(",")
        //         temp.forEach(val => {
        //             this.history.push({ history: val })
        //             this.userHistory = this.history;
        //         })
        //     },
        //     err => {
        //         console.log("Error:", err)
        //     }
        // )
        //this.history = [];
    }
}