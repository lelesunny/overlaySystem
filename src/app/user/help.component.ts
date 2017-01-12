import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../_services/index';


@Component({
    selector: 'user-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css']
})
export class HelpComponent {
    private userTags: any = [{"id":123,"name":"Custom for associating with demos  ","userid":2,"tagid":15,"username":"user","created":0},{"id":84,"name":"1 running application","userid":2,"tagid":9,"username":"user","created":0},{"id":63,"name":"Beta","userid":2,"tagid":7,"username":"user","created":0},{"id":138,"name":"CN TEST","userid":2,"tagid":157,"username":"user","created":0},{"id":81,"name":"1 saved lab","userid":2,"tagid":144,"username":"user","created":0},{"id":133,"name":"Can extend 4 hour","userid":2,"tagid":143,"username":"user","created":0}];
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
    private emailTo: any="sian.chen@example.com";
    private linkSupport: string="https://www.google.com";
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