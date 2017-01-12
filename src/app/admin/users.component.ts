import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService, TagService, LabService } from '../_services/index';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';

@Component({
    selector: 'admin-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class AdminUsersComponent implements OnInit {
    private selectedUser: any;
    private selectedTags: any;
    private Loading: boolean;
    private loading: boolean;

    private temp: any = [];
    private items: any = [];
    private item: any = [];
    private value: any = ['tag'];
    private itemsToStringTags: any;
    private tagsToStringTags: any;
    private tagsUpdate: any = {};
    private tags: any = [];
    private tagsTemp: any = [];
    private actived: any;
    private adminUser: any = [{ "id": 2, "username": "user", "isadmin": false, "islocal": true, "created": 1478096197011, "lastlogintime": 1484077005224, "tags": [{ "name": "Custom for associating with demos  ", "userid": 2, "tagid": 15, "created": 0 }, { "name": "Can extend 4 hour", "userid": 2, "tagid": 143, "created": 0 }, { "name": "CN TEST", "userid": 2, "tagid": 157, "created": 0 }, { "name": "Beta", "userid": 2, "tagid": 7, "created": 0 }, { "name": "1 saved lab", "userid": 2, "tagid": 144, "created": 0 }, { "name": "1 running application", "userid": 2, "tagid": 9, "created": 0 }] }, { "id": 18, "username": "newman.christopher@gmail.com", "isadmin": false, "islocal": false, "created": 1478138646062, "lastlogintime": 0, "tags": [] }, { "id": 19, "username": "jon.c@example.com", "isadmin": false, "islocal": false, "created": 1478176928369, "lastlogintime": 0, "tags": [] }, { "id": 20, "username": "pete@example.com", "isadmin": false, "islocal": false, "created": 1478176928485, "lastlogintime": 0, "tags": [] }, { "id": 21, "username": "graham.@example.com", "isadmin": false, "islocal": false, "created": 1478176928510, "lastlogintime": 0, "tags": [] }, { "id": 46, "username": "chris_newman@symantec.com", "isadmin": false, "islocal": false, "created": 1478472459626, "lastlogintime": 1483998172428, "tags": [] }, { "id": 47, "username": "mohammad_kaouk@symantec.com", "isadmin": false, "islocal": false, "created": 1478472459657, "lastlogintime": 0, "tags": [] }, { "id": 48, "username": "alberto@example.com", "isadmin": false, "islocal": false, "created": 1478491118638, "lastlogintime": 0, "tags": [] }, { "id": 49, "username": "alexan@example.com", "isadmin": false, "islocal": false, "created": 1478491118663, "lastlogintime": 0, "tags": [] }, { "id": 50, "username": "andre@example.com", "isadmin": false, "islocal": false, "created": 1478491118692, "lastlogintime": 0, "tags": [] }, { "id": 51, "username": "anja@example.com", "isadmin": false, "islocal": false, "created": 1478491118712, "lastlogintime": 0, "tags": [] }, { "id": 52, "username": "ariel@example.com", "isadmin": false, "islocal": false, "created": 1478491118738, "lastlogintime": 0, "tags": [] }, { "id": 53, "username": "aym@example.com", "isadmin": false, "islocal": false, "created": 1478491118756, "lastlogintime": 0, "tags": [] }, { "id": 54, "username": "bar@example.com", "isadmin": false, "islocal": false, "created": 1478491118784, "lastlogintime": 0, "tags": [] }]
    private userHistory: any;
    private history: any = [];
    private historyLoading: boolean;
    private er: any = {};

    private val: string = '';
    options = new TableOptions({
        columnMode: ColumnMode.force,
        headerHeight: 43,
        footerHeight: 40,
        rowHeight: 'auto',
        // externalPaging: true,
        // limit: 10,
        // loadingIndicator: true
    });

    ngOnInit() {

        // this.getUser();
        this.getUserTag();
    }

    onPage({ offset, limit, count }) {
        this.getUser();
    }

    getUserHistory(data) {
        // this.historyLoading = true;
        this.userService.getUserHistory(data.id).subscribe(
            e => {
                let temp = e.toString().split(",")
                temp.forEach(val => {
                    this.history.push({ history: val })
                    this.historyLoading = false;
                    this.userHistory = this.history;
                })
            }, error => {
                this.errorHandling(error);
                window.alert("Error Message ： " + this.er.message);
                this.deleteLoading = false;
            }
        )
        this.history = [];
    }

    gotoDetail(value): void {
        this.selectedUser = value;
    }

    go() {
        window.alert(
            "TODO FUNCTION"
        )
    }
    Done(value) {
        //update the current tag
        // this.loading = true;
        if (this.value.length) {
            this.value.forEach(
                (e) => {
                    this.tagsTemp.push({ userid: this.selectedTags.id, tagid: e.id })
                    this.tags = this.tagsTemp;
                })
        } else {
            this.tags = this.original
        }

        this.tagsTemp = [];

        this.tagsUpdate = { id: this.selectedTags.id, username: this.selectedTags.username, tags: this.tags };
        //call to make the change
        this.tagService.updateUserTags(this.tagsUpdate).subscribe(
            (e) => {
                this.getUser();
                this.loading = false;
            }
        )
    }
    updateFilter(val) {
        let va = val.toLowerCase();
        // remove existing
        this.adminUser.splice(0, this.adminUser.length);
        // filter our data
        let temp = this.temp.filter(function (d) {
            return d.username.toLowerCase().indexOf(va) !== -1 || !va;
        });
        // update the rows
        // this.options.count = temp.length;
        // let start = this.options.offset * this.options.limit;
        // let end = start + this.options.limit;
        // for (let i = start; i < end; i++) {
        //    this.adminUser[i] =temp[i];
        // }
        this.adminUser.push(...temp);
        // this.options.count = this.adminUser.length;
        // let start = this.options.offset * this.options.limit;
        // let end = start + this.options.limit;
        // for (let i = 0; i < this.options.count; i++) {
        //     temp[i] = this.adminUser[i];

        // }
        // this.options.offset = 0;
        // this.adminUser.splice(0, this.adminUser.length);

        // this.adminUser.push(...temp)
    }
    private original: any = [];
    add(row) {
        let cc = row.tags;
        this.actived = [];
        this.original = [];
        cc.forEach((item) => {
            this.actived.push({ id: item.tagid, text: item.name });
            this.original.push({ tagid: item.tagid, userid: item.userid });
        })
        this.selectedTags = row;
        this.value = [];
    }
    private rowTemp: boolean;
    private deleteLoading: boolean;
    adminDeleteUser(row) {
        this.rowTemp = row.id;
        this.deleteLoading = true;
        let confirmDelete: boolean = window.confirm("Are you sure you want to delete the \"" + row.name + "\" user? Please note that when an user is deleted, cuser’s labs, history, tags will also be deleted.");
        if (confirmDelete) {
            this.labService.deleteTag(row.id).subscribe(
                e => {
                    this.getUser();
                    // this.deleteLoading = false;
                }, error => {
                    this.errorHandling(error);
                    window.alert("Error Message ： " + this.er.message);
                    // this.deleteLoading = false;
                }
            )
        } else {
            this.deleteLoading = false;
        }
    }



    constructor(
        private router: Router,
        private userService: UserService,
        private tagService: TagService,
        private labService: LabService
    ) {
        this.getUser()
    }


    public getUser() {
        this.Loading = true;
        this.userService.getUsers().subscribe(
            e => {
                this.adminUser = e;
                this.temp = [...this.adminUser];
                this.options.count = e.length;
                let start = this.options.offset * this.options.limit;
                let end = start + this.options.limit;
                for (let i = start; i < end; i++) {
                    this.adminUser[i] = e[i];
                }
                this.Loading = false;

            },
            err => console.error(err)

        )
    }
    public getUserTag() {
        let e = [{ "id": 1, "name": "Can extend 2 hour", "description": "User can extend lab by 2 hours", "tagtype": "U", "isprebuilt": true, "created": 1478550944305 }, { "id": 4, "name": "Can extend unlimited", "description": "User can extend lab for unlimited amount of time", "tagtype": "U", "isprebuilt": true, "created": 1478551023688 }, { "id": 9, "name": "1 running application", "description": "Limits number of running apps for user", "tagtype": "U", "isprebuilt": true, "created": 1478551227159 }, { "id": 10, "name": "3 running application", "description": "Limits number of running apps for user to 3", "tagtype": "U", "isprebuilt": true, "created": 1478551309630 }, { "id": 11, "name": "unlimited running application", "description": "Allows user to run unlimited number of applications", "tagtype": "U", "isprebuilt": true, "created": 1478551359294 }, { "id": 14, "name": "Custom for associating with usersets", "description": "Custom for associating with usersets Lab Tag", "tagtype": "L", "isprebuilt": true, "created": 1478551655232 }, { "id": 15, "name": "Custom for associating with demos  ", "description": "Custom for associating with demos  ", "tagtype": "U", "isprebuilt": true, "created": 1478551676946 }, { "id": 143, "name": "Can extend 4 hour", "description": "User can extend lab for 4 hours", "tagtype": "U", "isprebuilt": true, "created": 1479490373124 }, { "id": 5, "name": "Default", "description": "Default user tag", "tagtype": "B", "isprebuilt": true, "created": 1478551036603 }, { "id": 7, "name": "Beta", "description": "Beta user tag", "tagtype": "B", "isprebuilt": true, "created": 1478551127746 }, { "id": 144, "name": "1 saved lab", "description": "User can save one lab", "tagtype": "U", "isprebuilt": true, "created": 1479490493992 }, { "id": 145, "name": "3 saved lab", "description": "User can save three labs", "tagtype": "U", "isprebuilt": true, "created": 1479490512041 }, { "id": 146, "name": "unlimited save lab", "description": "User can save unlmited number of  labs", "tagtype": "U", "isprebuilt": true, "created": 1479490529981 }, { "id": 147, "name": "BulkLab", "description": "Tag used for Bulk Labs", "tagtype": "L", "isprebuilt": true, "created": 1480433098197 }, { "id": 154, "name": "blackhat", "description": "Custom tag for blackhat training", "tagtype": "B", "isprebuilt": false, "created": 1480626606052 }, { "id": 157, "name": "CN TEST", "tagtype": "B", "isprebuilt": false, "created": 1480954643627 }, { "id": 159, "name": "tagname", "description": "tagdescr", "tagtype": "B", "isprebuilt": false, "created": 1481040055215 }, { "id": 169, "name": "ATP", "description": "Tag for advanced threat lab", "tagtype": "B", "isprebuilt": false, "created": 1482355735808 }];

        e.forEach((val) => {
                this.item.push({ id: val.id, text: val.name })
            this.items = this.item.sort((a, b) => {
                return a.text - b.text || a.text.localeCompare(b.text)
            })
        })

        this.tagService.getUserTags().subscribe(
            e => {
                e.forEach((val) => {
                    if (val.tagtype == 'U' || val.tagtype == 'B') {
                        this.item.push({ id: val.id, text: val.name })
                    }
                    this.items = this.item.sort((a, b) => {
                        return a.text - b.text || a.text.localeCompare(b.text)
                    })
                })
            }
        )
    }
    public selected(value: any): void {
        console.log('Selected value is: ', value);
    }

    public removed(value: any): void {
        console.log('Removed value is: ', value);
    }

    public refreshValue(value: any): void {
        this.value = value;
        console.log("this.value", this)
        console.log("this.value", this.value)
        return this.value;
    }
    public itemsToString(value: Array<any> = []): string {

        this.itemsToStringTags = value
            .map((item: any) => {
                return item.id;
            }).join(',');

        return this.itemsToStringTags;
    }
    public tagsToString(value: Array<any> = []): string {

        this.tagsToStringTags = value
            .map((item: any) => {
                return item.name;
            }).join(',');

        return this.tagsToStringTags;
    }
    public errorHandling(error) {
        let err = error.split(":");
        let e = err[err.length - 1].trim();
        this.er.message = e.slice(0, e.length - 2);
        let status = err[1].split(",")[0];
        this.er.status = status;
        return this.er;
    }
}
