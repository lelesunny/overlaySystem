import { Component, Input, Output, EventEmitter, SimpleChange, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService, TagService, LabService, UserInfoService } from '../_services/index';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';


@Component({
    selector: 'user-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private selectedUser: any;
    // private labUsers: any = [{ id: "", name: "" }];
    private temp: any = [];
    // private Loading: boolean;
    // private Load: boolean = true;
    private loading: boolean;
    private loadingextend: boolean;
    private rows: any = [
        {"id":86,"name":"12/2 demo 2 template ","instructions":"demo 1 blueprint example instruction","blueprintid":76021913,"created":0,"tags":[],"status":"STARTED"},
        {"id":93,"name":"New CN","instructions":"Test Instructions","blueprintid":76021913,"created":0,"tags":[],"status":"STOPPED"},
        {"id":83,"name":"Nebula Test Application","emailtemplateId":30,"instructions":"**Test Instructions for display 1**\n**Second Line**","blueprintid":76021913,"created":0,"tags":[],"status":"STARTING"},
        {"id":89,"name":"Bluecoat Full Lab - Unconfigured - SG,CAS,MC,Rep","emailtemplateId":23,"instructions":"Test Instructions","blueprintid":76745498,"created":0,"tags":[],"status":"DELETED"}
        ];    
    private labUsers: any = [{"id":86,"name":"Example demo 2 template ","instructions":"demo 1 blueprint example instruction","blueprintid":76021913,"created":0,"tags":[]},{"id":93,"name":"New CN","instructions":"Test Instructions","blueprintid":76021913,"created":0,"tags":[]},{"id":83,"name":"Nebula Test Application","emailtemplateId":30,"instructions":"**Test Instructions for display 1**\n**Second Line**","blueprintid":76021913,"created":0,"tags":[]},{"id":89,"name":"Bluecoat Full Lab - Unconfigured - SG,CAS,MC,Rep","emailtemplateId":23,"instructions":"Test Instructions","blueprintid":76745498,"created":0,"tags":[]}];
    private rowTemp: any;
    private error: any;
    val: string = '';
    private extendOptions: any = [{"label":"2 hr","value":7200},{"label":"4 hr","value":14400},{"label":"Never","value":99999}];
    private regions: any = ["US Central 1","US East 1","US West 1","US West 2","Europe West 2","Singapore","Sydney","Taiwan"];
    private er: any = {};
    private pauseLoading: boolean;
    private deleteLoading: boolean;
    private saveLoading: boolean;
    private setintervalHandle: any;
    private scheduleLoading: boolean;
    //table options
    options = new TableOptions({
        columnMode: ColumnMode.force,
        headerHeight: 43,
        footerHeight: 0,
        rowHeight: 42,
        scrollbarV: true,
        // loadingIndicator: true

        // scrollbarH: true
    });
    options2 = new TableOptions({
        columnMode: ColumnMode.force,
        headerHeight: 43,
        footerHeight: 0,
        rowHeight: 45,
        scrollbarV: true,
        // loadingIndicator: true

        // scrollbarH: true
    });
    public optimizeOptions = [
        { value: 'C', display: 'Cost' },
        { value: 'P', display: 'Performance' }
    ];

    ngOnInit() {
        this.getUserLab();
        this.getUserRunningLab();
        this.setintervalHandle = setInterval(() => {
            this.getUserRunningLabA();
        }, 15000);
        this.getExtendOptions();
        this.getRegionsOptions();
        this.getTimeZone();
    }

    onExtend($event) {
        let action = "extend";
        this.loadingextend = true;
        this.labService.userActionRunningLab($event.id, action, $event.selectedOption).subscribe(
            e => {
                this.getUserRunningLabA();
            },
            error => {
                console.log("extend", error)

                this.errorHandling(error);
                window.alert("Error Message ： " + this.er.message);
                this.loadingextend = false;
            }

        )
    }
    onSave($event) {
        let action = "save";
        this.rowTemp = this.selectedUser.id;
        let self = this;
        this.saveLoading = true;
        this.labService.userActionRunningLab($event.id, action, $event.name).subscribe(
            e => {
                this.getUserRunningLabA();
                this.saveLoading = false;

            },
            error => {
                this.errorHandling(error);
                window.alert("Error Message ： " + this.er.message);
                this.loading = false;
                this.saveLoading = false;

            }
        )
    }
    onSchedule($event) {
        console.log("homepageevent", $event)
        this.scheduleLoading = true;
        let action = 'schedule'
        this.rowTemp = this.selectedUser.id;
        this.error = "";
        this.userService.postUserLabSchedule(this.selectedUser.id, action, $event).subscribe(
            e => {
                this.getUserRunningLabA();
                this.scheduleLoading = false;
                console.log("post success %%")
            }, error => {
                this.errorHandling2(error);
                console.log(error);
                window.alert("Error Message ： " + this.errorMessage);
                this.scheduleLoading = false;
            }
        );
    }
    gotoDetail(value): void {
        this.selectedUser = value;
    }

    updateFilter(val) {
        let va = val.toLowerCase();
        // remove existing
        this.labUsers.splice(0, this.labUsers.length);
        // filter our data
        let temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(va) !== -1 || !va;
        });
        // update the rows
        this.labUsers.push(...temp);
    }

    onStart(row): void {
        // console.log("selectedid", row)
        this.loading = true;
        //for lazyloading snipper
        this.rowTemp = this.selectedUser.id;
        this.error = "";
        this.labService.startUserLab(this.selectedUser.id, row).subscribe(
            e => {
                // console.log("done:1");
                this.getUserRunningLab();
                this.loading = false;
            },
            error => {
                console.log("start", error)

                this.errorHandling(error);
                window.alert("Error Message ： " + this.er.message);
                this.loading = false;

            }
        );
    }


    pauseRunningLab(row): void {
        let self = this;
        this.rowTemp = row.id;
        let confirmPause: boolean = window.confirm("Are you sure you want to pause the \"" + row.name + "\" lab?");
        if (confirmPause) {
            let action = "stop"
            this.pauseLoading = true;
            this.labService.userActionRunningLab(row.id, action, {}).subscribe(
                e => {
                    setTimeout(function () {
                        self.getUserRunningLabA();
                    }, 500);
                    // this.getUserRunningLab();
                },
                error => {
                    console.log("pause", error)
                    this.errorHandling(error);
                    window.alert("Error Message ： " + this.er.message);
                    this.pauseLoading = false;
                }
            )
        }
    }

    deleteRunningLab(row): void {
        this.rowTemp = row.id;
        let confirmDelete: boolean = window.confirm("Are you sure you want to delete the \"" + row.name + "\" lab?");
        if (confirmDelete) {
            let action = "delete"
            this.deleteLoading = true;
            this.labService.userActionRunningLab(row.id, action, {}).subscribe(
                e => {
                    this.getUserRunningLabA();
                },
                error => {
                    this.errorHandling(error);
                    window.alert("Error Message ： " + this.er.message);
                    this.deleteLoading = false;
                }
            )
        }
    }
    private startLoading: boolean;
    startRunningLab(row): void {
        this.rowTemp = row.id;
        let confirmDelete: boolean = window.confirm("Are you sure you want to start the \"" + row.name + "\" saved lab?");
        if (confirmDelete) {
            let action = "start"
            this.startLoading = true;
            this.labService.userActionRunningLab(row.id, action, {}).subscribe(
                e => {
                    this.getUserRunningLabA();
                },
                error => {
                    this.errorHandling(error);
                    window.alert("Error Message ： " + this.er.message);
                    // this.startLoading = false;
                }
            )
        }
    }
    startSavedLab() {
        window.alert("developing")
    }

    constructor(
        private router: Router,
        private userService: UserService,
        private tagService: TagService,
        private labService: LabService,
        private userInfoService: UserInfoService) { }


    public getUserLab() {
        // this.Loading = true;
        this.labService.getUserLab().subscribe(
            e => {
                this.labUsers = e;
                this.temp = [...e];
                // this.Loading = false;
            },
            err => console.error(err)
        )
    }
    private labInfoLoad: boolean;
    private userLabInfo: any;
    public getUserLabInfo(id) {
        let action = 'info';
        this.labInfoLoad = true;
        this.userInfoService.getUserLabInfo(id, action).subscribe(
            e => {
                this.userLabInfo = e.value;
                this.labInfoLoad = false;
            },
            err => {
                this.errorHandling(err);

            }
        )
    }

    public getUserRunningLab() {
        // this.Load = true;
        this.labService.getUserRunningLab().subscribe(
            e => {
                this.rows = e.sort((a, b) => {
                    return a.status - b.status || a.status.localeCompare(b.status)
                });
                // this.Load = false;
            },
            err => console.error(err)

        )
    }
    public getUserRunningLabA() {
        let self = this;
        this.labService.getUserRunningLab().subscribe(
            e => {
                this.rows = e.sort((a, b) => {
                    return a.status - b.status || a.status.localeCompare(b.status)
                });
                self.loadingextend = false;

            },
            err => {
                this.errorHandling(err);

            }

        )
    }
    public getExtendOptions() {
        this.labService.getExtendOption().subscribe(
            e => {
                this.extendOptions = e;
            }
        )
    }
    public getRegionsOptions() {
        this.userService.getUserRegions().subscribe(
            e => {
                this.regions = e;
            }
        )
    }
    private timezones: any = [];

    public getTimeZone() {
        this.timezones = ["Africa/Abidjan","Africa/Accra","Africa/Addis_Ababa","Africa/Algiers","Africa/Asmara","Africa/Asmera","Africa/Bamako","Africa/Bangui","Africa/Banjul","Africa/Bissau","Africa/Blantyre","Africa/Brazzaville","Africa/Bujumbura","Africa/Cairo","Africa/Casablanca","Africa/Ceuta","Africa/Conakry","Africa/Dakar","Africa/Dar_es_Salaam","Africa/Djibouti","Africa/Douala","Africa/El_Aaiun","Africa/Freetown","Africa/Gaborone","Africa/Harare","Africa/Johannesburg","Africa/Juba","Africa/Kampala","Africa/Khartoum","Africa/Kigali","Africa/Kinshasa","Africa/Lagos","Africa/Libreville"]
        this.userService.getUserTimeZone().subscribe(
            e => {
                this.timezones = e;
            }
        )
    }
    public errorHandling(error) {
        let err = error.split(":");
        let e = err[err.length - 1].trim();
        this.er.message = e.slice(0, e.length - 2);
        let status = err[1].split(",")[0];
        this.er.status = status;
        return this.er;
    }
    private errorMessage : string;
    public errorHandling2(error) {
        let err = error.split(",");
        let e = err[err.length - 1].trim().split('"');
        this.errorMessage = e[e.length-2]
        return this.errorMessage;
    }
    ngOnDestroy() {
        //console.log('onDestroy2.....');
        window.clearInterval(this.setintervalHandle)
    }
}

