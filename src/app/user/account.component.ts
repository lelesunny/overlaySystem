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
    private userTags: any = [];
    private userHistory: any = [];
    private history: any = [];
    private user:any;
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
        this.userInfoService.getUserHistory().subscribe(
            e => {
                let temp = e.toString().split(",")
                temp.forEach(val => {
                    this.history.push({ history: val })
                    this.userHistory = this.history;
                })
            },
            err => {
                console.log("Error:", err)
            }
        )
        this.history = [];
    }
}