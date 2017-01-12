import { Component, Input, Output, EventEmitter, SimpleChange, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabService } from '../_services/index';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';

@Component({
    selector: 'user-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class AdminHomeComponent implements OnInit {
    private selectedUser: any;
    private adminhistroylab: any = [{"id":1415,"userid":475,"labid":88,"name":"2017-01-10 - SG - Full - Jan 16 EMEA SYMC SEs","status":"STOPPED","nextstop":"","username":"wolf_schreiner@example.com","ravelloappid":77529106,"starttime":0,"endtime":0,"issaved":true},{"id":1416,"userid":477,"labid":88,"name":"2017-01-10 - SG - Full - Jan 16 EMEA SYMC SEs","status":"STARTED","nextstop":"","username":"olaf_mischkovsky@example.com","ravelloappid":77496341,"starttime":0,"endtime":0,"issaved":false},{"id":1417,"userid":478,"labid":88,"name":"2017-01-10 - SG - Full - Jan 16 EMEA SYMC SEs","status":"STARTING","nextstop":"","username":"sven_vonkreyfeld@example.com","ravelloappid":77529107,"starttime":0,"endtime":0,"issaved":false},{"id":1418,"userid":479,"labid":88,"name":"2017-01-10 - SG - Full - Jan 16 EMEA SYMC SEs","status":"STOPPED","nextstop":"","username":"alex_peters@example.com","ravelloappid":77529108,"starttime":0,"endtime":0,"issaved":true},{"id":1419,"userid":480,"labid":88,"name":"2017-01-10 - SG - Full - Jan 16 EMEA SYMC SEs","status":"STOPPED","nextstop":"","username":"gerald_maronde@example.com","ravelloappid":77496343,"starttime":0,"endtime":0,"issaved":false},{"id":1420,"userid":481,"labid":88,"name":"2017-01-10 - SG - Full - Jan 16 EMEA SYMC SEs","status":"STOPPED","nextstop":"","username":"matthias_senft@example.com","ravelloappid":77529110,"starttime":0,"endtime":0,"issaved":false},{"id":1421,"userid":482,"labid":88,"name":"2017-01-10 - SG - Full - Jan 16 EMEA SYMC SEs","status":"DELETED","nextstop":"","username":"lars_kroll@example.com","ravelloappid":77529109,"starttime":0,"endtime":0,"issaved":false},{"id":1422,"userid":483,"labid":88,"name":"2017-01-10 - SG - Full - Jan 16 EMEA SYMC SEs","status":"STOPPED","nextstop":"","username":"hakan_arslanboga@example.com","ravelloappid":77496344,"starttime":0,"endtime":0,"issaved":false}];
    private loading: boolean;
    private temp: any = [];
    private er: any = {};
    private rowTemp: boolean;
    private pauseLoading: boolean;
    private deleteLoading: boolean;
    private setintervalHandle: any;
    private adminLabInfo: any;
    private labInfoLoad: boolean;
    val: string = '';
    options = new TableOptions({
        columnMode: ColumnMode.force,
        headerHeight: 43,
        footerHeight: 0,
        rowHeight: 42,
        scrollbarV: true,
        // loadingIndicator: true
    });

    ngOnInit() {
        this.getAllLabs();
        this.setintervalHandle = setInterval(() => {
            this.getAllLabs();
        }, 10000);
    }
    private userHistory: any = "Here may get data about history"
    private history: any = ["Scheduled lab \u003cb\u003ewolf_schreiner@example.com - 2017-01-10 - SG - Full - Jan 16 EMEA SYMC SEs\u003c/b\u003e at \u003cb\u003e2017-01-10 17:59:21\u003c/b\u003e"];;
    go(id) {
        let action = 'history'
        this.labService.getAdminLabInfo(id, action).subscribe(
            e => {
                let temp = e.toString().split(",")
                temp.forEach(val => {
                    this.history.push({ history: val })
                    this.userHistory = this.history;
                })
            }
        )
        this.history = [];
    }
    gotoDetail(value): void {
        this.selectedUser = value;
    }
    updateFilter(val) {
        let va = val.toLowerCase();
        // remove existing
        this.adminhistroylab.splice(0, this.adminhistroylab.length);
        // filter our data
        let temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(va) !== -1 || d.status.toLowerCase().indexOf(va) !== -1 || d.username.toLowerCase().indexOf(va) !== -1 || !va;
        });
        // update the rows
        this.adminhistroylab.push(...temp);
    }
    adminPauseLab(row) {
        let self = this;
        self.rowTemp = row.id;
        // self.pauseLoading = true;
        let confirmPause: boolean = window.confirm("Are you sure you want to pause the \"" + row.name + "\" lab?");
        if (confirmPause) {
            let action = 'stop';
            this.labService.adminActionRunningLab(row.id, action).subscribe(
                e => {
                    setTimeout(function () {
                        self.getAllLabs();

                    });
                }, err => {
                    console.log(err)
                    // self.pauseLoading = false;

                }
            )
        } else {
            // this.pauseLoading = false;
        }
    }
    adminDeleteLab(row) {
        this.rowTemp = row.id;
        // this.deleteLoading = true;
        let confirmDelete: boolean = window.confirm("Are you sure you want to delete the \"" + row.name + "\" lab?");
        if (confirmDelete) {
            let action = 'delete';
            this.labService.adminActionRunningLab(row.id, action).subscribe(
                e => {
                    this.deleteLoading = false;
                    this.getAllLabs();

                }, error => {
                    this.errorHandling(error);
                    window.alert("Error Message ： " + this.er.message);
                    this.deleteLoading = false;
                }
            )
        } else {
            this.deleteLoading = false;
        }
    }

    public getAllLabs() {
        this.labService.getAllLabs().subscribe(
            e => {
                this.adminhistroylab = e;
                this.temp = [...e]
            },
            err => {
                this.errorHandling(err);
                if (this.er.status == 403 || this.er.status == 401) {
                    this.router.navigate(['login']);
                }
            }
        )
    }
    constructor(
        private router: Router,
        private labService: LabService
    ) { }
    public errorHandling(error) {
        let err = error.split(":");
        let e = err[err.length - 1].trim();
        this.er.message = e.slice(0, e.length - 2);
        let status = err[1].split(",")[0];
        this.er.status = status;
        return this.er;
    }

    public getAdminLabInfo(id) {
        let action = 'info';
        // this.labInfoLoad = true;
        this.labService.getAdminLabInfo(id, action).subscribe(
            e => {
                this.adminLabInfo = e.value;
                // this.labInfoLoad = false;
            },
            err => {
                this.errorHandling(err);

            }
        )
    }

    ngOnDestroy() {
        //console.log('onDestroy1.....');
        window.clearInterval(this.setintervalHandle)
    }
}
