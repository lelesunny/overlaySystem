import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, LabService } from '../_services/index';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';

@Component({
    selector: 'admin-bulkcreatehistory',
    templateUrl: './bulkcreatehistory.component.html',
    styleUrls: ['./bulkcreatehistory.component.css']
})
export class AdminBulkCreateHistoryComponent implements OnInit {
    private selectedUser: any;

    private adminBulkHistroy: any = [{"id":55,"name":"SG - Full - Jan 16 EMEA SYMC SEs","created":1484071161591,"noofinstances":9},{"id":54,"name":"new cn","created":1483998172428,"noofinstances":1},{"id":53,"name":"cntest","created":1483997709092,"noofinstances":1},{"id":52,"name":"WSS PoC - Customername","created":1483997349900,"noofinstances":1},{"id":51,"name":"WSS PoC - Customer Name2","created":1483990211491,"noofinstances":1},{"id":50,"name":"WSS POC - Customer Name","created":1483988881863,"noofinstances":1},{"id":49,"name":"Peter testing","created":1483714526494,"noofinstances":1}];

    private temp: any = [];
    private Loading: boolean;
    title = "Home";
    val: string = '';

    options = new TableOptions({
        columnMode: ColumnMode.force,
        headerHeight: 43,
        footerHeight: 0,
        rowHeight: 42,
        sorts: [{ prop: 'created', dir: SortDirection.desc }],
        scrollbarV: true,
        // loadingIndicator: true

        // scrollbarH: true
    });


    ngOnInit() {
        this.temp = [...this.adminBulkHistroy]
        //RESTFUL CALL FOR adminBulkHistroy 
        // this.userService.getBulkList().subscribe(
        //     e => {
        //         this.adminBulkHistroy = e;
        //         this.temp = [...e]
        //         this.Loading = false;
        //     }
        // )

    }
    private userLabs: any = [{ name: 'EXAMPLE1',username:'exampleUser1' ,status: 'running',starttime:'1483384633148',endtime:'1483384633148', }];
    getBulkUserLabs() {
        this.userService.getBulkUserLab(this.selectedUser.id).subscribe(
            e => {
                this.userLabs = {"id":31,"labid":88,"name":"SG test no user","created":1483384633148,"noofinstances":0,"ulabs":[{"id":1374,"userid":46,"labid":88,"name":"chris_newman@example.com - 2017-01-02 - SG test no user","status":"DELETED","username":"chris_newman@example.com","ravelloappid":77201926,"starttime":0,"endtime":0,"issaved":false},{"id":1375,"userid":471,"labid":88,"name":"newtest@dotrust.me - 2017-01-02 - SG test no user","status":"DELETED","username":"newtest@dotrust.me","ravelloappid":77234722,"starttime":0,"endtime":0,"issaved":false}]};
                this.Loading = false;

            }
        )
    }
    setDeadline($event) {
        console.log("get you ", $event)
        let action = 'save';
        if ($event) {
            this.labService.adminBulkSaveLab($event.id, {newdeletedate:$event.date,newdeletetime:$event.time}, action).subscribe(
                e => {
                    this.getBulkUserLabs()
                    console.log("save done")
                }
            )
        }

    }


    constructor(
        private router: Router,
        private userService: UserService,
        private labService: LabService
    ) { }

    gotoDetail(row): void {
        this.selectedUser = row;
    }
    // updateFilter(val) {
    //     let va = val.toLowerCase();
    //     // remove existing
    //     this.adminBulkHistroy.splice(0, this.adminBulkHistroy.length);
    //     // filter our data
    //     let temp = this.temp.filter(function (d) {
    //         return d.name.toLowerCase().indexOf(va) !== -1 || !va;
    //     });
    //     // update the rows
    //     this.adminBulkHistroy.push(...temp);
    // }
}
