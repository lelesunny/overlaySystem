import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { SettingService } from '../_services/index';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';

@Component({
    selector: 'admin-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css']
})
export class AdminSettingComponent {
    private selectedUser: any;
    private selected: any;
    private settingData: any = [{"id":2,"name":"onelogin.saml2.sp.entityid","value":"http://www.okta.com/exk8yfd55554zxwHLlIToe0h7","description":"Identifier of the SP entity  (must be a URI)","created":1481427075079},{"id":3,"name":"onelogin.saml2.idp.entityid","value":"http://www.okta.com/exk8y43434HLlIToe0h7","description":"Identifier of the IdP entity  (must be a URI)","created":1481427075079},{"id":5,"name":"onelogin.saml2.idp.single_s4n_on_service.url","value":"https://dev-987512.oktapreview.com/app/dotrustdev987512_1/exk8yfdzxwHLlIToe0h7/sso/saml","description":"SSO endpoint info of the IdP. (Authentication Request protocol) URL Target of the IdP where the SP will send the Authentication Request Message","created":1481427075079},{"id":6,"name":"onelogin.saml2.idp.x509cert","value":"MIIDpDCCAoygAwIBAgIGAVjXBSyPMA0GCSqGSIb3DQEBBQUAMIGSMQswCQYDVQQGEwJVUzETMBEGA1UECAl6m0UeCSBeKhTdxYQNKpdyK6AtX48ZKD+AxUDcxMNoEpbuMmsGEGfd2UjZE5BPLWq/3HDGJce8G+UjL59e+aXa","description":"Public x509 certificate of the IdP","created":1481427075079},{"id":4,"name":"onelogin.saml2.sp.assertion_consumer_service.url","value":"https://cloud.example.com/postlogin","description":"Specifies info about where and how the \u003cAuthnResponse\u003e message MUST be  returned to the requester, in this case our SP. URL Location where the \u003cResponse\u003e from the IdP will be returned","created":1481427075079},{"id":7,"name":"instrfaq.link","value":"https://www.example.com","description":"Instructions and FAQ Link","created":1482169422781},{"id":8,"name":"cloud.regions","value":"US Central 1/us-central-1,US East 1/us-east-1,US West 1/us-west-1,US West 2/us-west-2,Europe West 2/eu-west-2,Singapore/ap-southeast-1,Sydney/ap-southeast-2,Taiwan/ap-east-1","description":"cloud regions","created":1482441465691},{"id":1,"name":"admin.email","value":"@example.com","description":"Adminstrator email id","created":1481427075079}];
    // private settingData: any = [{ name: '', value: '' }];

    val: string = '';

    options = new TableOptions({
        columnMode: ColumnMode.force,
        headerHeight: 43,
        footerHeight: 50,
        rowHeight: 'auto',
        limit: 10,
        // loadingIndicator: true

        // scrollbarH: true
    });

    ngOnInit() {
        this.getSetting()
    }
    press() {
        // event.preventDefault();
        event.stopPropagation();
    }

    getSetting() {
        this.settingService.getSetting().subscribe(
            e => {
                this.settingData = e;
            }
        )
    }
    editing = {};
    // private cellvalue: any = [];
    // private event: any;
    updateValue(event, cell, cellValue, row) {
        // this.event = event;
        // this.editing[row.$$index] = false
        this.settingData[row.$$index][cell] = event.target.value;


    }
    onsubmit(row) {
        this.editing[row.$$index] = false
        let data = { name: row.name, value: this.settingData[row.$$index]['value'], description: row.description }
        console.log("432", data)
        this.updateSetting(data);
    }
    oncancel(event, row, value) {
        this.editing[row.$$index] = false;
        this.arr.forEach(
            e => {
                if (e.id === row.id) {
                    this.settingData[row.$$index]['value'] = e.data;
                }
            }
        )
    }


    constructor(
        private router: Router,
        private settingService: SettingService
    ) { }
    private arr: any = [];
    gotoDetail(event, row): void {
        this.arr.forEach(
            e => {
                if (e.id === row.id) {
                    this.arr.splice(e, 1)
                }
            }
        )
        let data = event.target.textContent.trim();
        this.arr.push({ id: row.id, data: data })
        this.selectedUser = row;
    }
    gotoDetail1(row) {
        this.selected = row
    }
    public updateSetting(data) {
        this.settingService.updateSetting(data).subscribe(
            e => {
                console.log("success update setting")
            },
            err => {
                console.log(err)
            }
        )
    }


}
