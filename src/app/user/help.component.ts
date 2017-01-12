import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../_services/index';


@Component({
    selector: 'user-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css']
})
export class HelpComponent {
    private userTags: any = [];
    private model : any = {};
    ngOnInit() {
        this.getUserTag();
        this.getSupportEmail();
        this.getSupportLink()
    }
    onsubmit(){
        console.log("dadada=>",this.model);
        this.postSupport(this.model);
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
    private emailTo: any;
    private linkSupport: string;
    public getSupportEmail() {
        let action = 'toaddr'
        this.userInfoService.getSupport(action).subscribe(
            e => {
                this.emailTo = e.toaddr;
            }
        )
    }
    public getSupportLink() {
        let action = 'link'
        this.userInfoService.getSupport(action).subscribe(
            e => {
                this.linkSupport = e.link;
            }
        )
    }
    private messageSent : boolean = true;
    private Loading : boolean;
    public postSupport(data) {
        this.Loading = true;
        this.userInfoService.postSupport(data).subscribe(
            e => {
                console.log("succeed")
                this.messageSent = false;
                this.Loading = false;
            }
        )
    }

}