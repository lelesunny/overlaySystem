import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../_services/index';


@Component({
    selector: 'admin-bulkcreate',
    templateUrl: './bulkcreate.component.html',
    styleUrls: ['./bulkcreate.component.css']
})
export class AdminBulkCreateComponent implements OnInit {
    title = "Bulk Create"
    private model: any = {};
    private value: any = {};
    private emailTemp: any = [];
    private email: any;
    private isSchedule: any = {}
    private scheTemp: any = [];
    private date: any;
    private time: any;
    private timezones: any = [];
    private templates: any = []
    private actived: any = [];
    private loading: boolean;
    private emailUnvalid: any = []
    private unvalid: boolean;
    public schedulingOptions = [
        { value: 'A', display: 'Auto Start/Stop' },
        { value: 'M', display: 'Manual Start/Stop' }
    ];
    public optimizeOptions = [
        { value: 'C', display: 'Cost' },
        { value: 'P', display: 'Performance' }
    ];
    hours = ["1", "2", "3", "4", "5", "6", "7", "8"]
    private days = [];
    private regions: any = [];
    // private templateTags: any;

    ngOnInit() {
        this.model.isautomaticstart = false;
        this.model.schoption = 'A';
        this.model.optimizationlevel = 'C'
        //get timezone data
        this.userService.getTimeZone().subscribe(
            value => this.timezones = value
        )
        // get templates list 
        this.userService.getBulkCreateTemplates().subscribe(
            e => {
                let templateTags = e[0].tags;
                e.forEach((e) => {
                    this.actived.push({ id: e.id, text: e.name })
                })
                this.templates = this.actived;
                // templateTags.forEach((val) => {
                //     this.actived.push({ id: val.labid, text: val.name })
                //     this.templates = this.actived;
                // })
            },
            err => console.error(err)

        )
        this.userService.getRegions().subscribe(
            value => this.regions = value
        )
        this.Days(30);
    }
    constructor(
        private router: Router,
        private userService: UserService
    ) { }
    private hour: any;
    private noofdays: any;
    public selected(value: any): void { }
    public selectedHour(value: any): void {
        this.hour = value;
    }
    public Days(value: any) { 
        let c = []; 
        for (let i = 1; i <= value; i++) { 
            c.push({ id: i, text: i.toString() }) 
        }
        this.days = c; 
    }



    public refreshData(val: any): void {
        if (this.model.schoption == 'M') {
            this.model.startdate = null;
            this.model.noofdays = null;
            console.log(this.model);
        } else {
            this.model.schedule = null;
            console.log(this.model);
        }

    }


    public removed(value: any): void { }
    public typed(value: any): void { }

    public refreshValue(value: any): void {
        this.value = value;
    }
    public timezoneValue(value: any): void {
        this.model.timezone = value.text;
    }
    public regionValue(value: any): void {
        this.model.region = value.text;
    }
    public templateValue(value: any): void {
        this.model.labid = value.id;
    }
    // add mail to list   
    addEmail(email) {
        this.unvalid = false;
        if (email) {
            let emailArray = email.split(",")
            //regexp
            emailArray.forEach((e) => {
                if (e.trim().length > 0) {
                    var re = /\S+@\S+\.\S+/;
                    (re.test(e)) ? this.emailTemp.push(e) : this.emailUnvalid.push(e)
                    this.emailUnvalid.length > 0 ? this.unvalid = true : this.unvalid = false;
                }
            })
            this.email = this.emailUnvalid
            this.emailUnvalid = [];
            this.model.email = this.emailTemp;
        }

    }
    // delete the original email
    deleteEmail(email) {
        let index = this.model.email.indexOf(email);
        this.model.email.splice(index, 1)
    }
    // add start date time and duration to the above list 
    addDate(date, time) {
        if (date && time && this.value.text) {
            this.isSchedule = { startdate: date, starttime: time, duration: this.value.text }
            this.scheTemp.push(this.isSchedule)
            this.date = ""
            this.time = ""
            this.model.schedule = this.scheTemp;
        }
    }
    // delete the schedule item
    deleteSchedule(date) {
        let ar = this.model.schedule
        for (var i = 0; i < ar.length; i++) {
            if (ar[i].startdate == date.startdate && ar[i].starttime == date.starttime && ar[i].duration == date.duration) {
                ar.splice(i, 1);
            }
        }
    }
    // submit form
    go() {
        this.loading = true;
        this.userService.createBulkJob(this.model).subscribe(
            (e) => {
                this.loading = false;
                this.router.navigate(['admin/bulkcreatehistory']);
            },
            err => console.error(err)
        )

    }


}