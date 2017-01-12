import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router'
import { UserService, TagService } from '../_services/index';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';

@Component({
    selector: 'admin-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css']
})
export class AdminTagsComponent implements OnInit {
    title = "Tags"
    private tags: any = [{"id":1,"name":"Can extend 2 hour","description":"User can extend lab by 2 hours","tagtype":"U","isprebuilt":true,"created":1478550944305},{"id":4,"name":"Can extend unlimited","description":"User can extend lab for unlimited amount of time","tagtype":"U","isprebuilt":true,"created":1478551023688},{"id":9,"name":"1 running application","description":"Limits number of running apps for user","tagtype":"U","isprebuilt":true,"created":1478551227159},{"id":10,"name":"3 running application","description":"Limits number of running apps for user to 3","tagtype":"U","isprebuilt":true,"created":1478551309630},{"id":144,"name":"1 saved lab","description":"User can save one lab","tagtype":"U","isprebuilt":true,"created":1479490493992},{"id":145,"name":"3 saved lab","description":"User can save three labs","tagtype":"U","isprebuilt":true,"created":1479490512041},{"id":146,"name":"unlimited save lab","description":"User can save unlmited number of  labs","tagtype":"U","isprebuilt":true,"created":1479490529981},{"id":147,"name":"BulkLab","description":"Tag used for Bulk Labs","tagtype":"L","isprebuilt":true,"created":1480433098197},{"id":154,"name":"blackhat","description":"Custom tag for blackhat training","tagtype":"B","isprebuilt":false,"created":1480626606052},{"id":157,"name":"CN TEST","tagtype":"B","isprebuilt":false,"created":1480954643627},{"id":159,"name":"tagname","description":"tagdescr","tagtype":"B","isprebuilt":false,"created":1481040055215},{"id":169,"name":"ATP","description":"Tag for advanced threat lab","tagtype":"B","isprebuilt":false,"created":1482355735808}];
    private Loading: boolean = true;
    private loading: boolean;


    options = new TableOptions({
        columnMode: ColumnMode.force,
        headerHeight: 43,
        footerHeight: 0,
        rowHeight: 42,
        scrollbarV: true,
        scrollbarH: false,
        loadingIndicator: true

    });

    ngOnInit() {
        this.getTags();
    }
    constructor(
        private router: Router,
        private tagService: TagService,
        private zone: NgZone
    ) { }
    public getTags() {
        this.tagService.getUserTags().subscribe(
            (e) => {
                this.tags = e;
                this.Loading = false;

            }
        )
    }
    private error: any;
    onSubmit($event) {
        let self = this
        console.log("get you", $event);
        this.loading = true;
        this.tagService.customNewTag($event).subscribe(
            (res) => {
                this.submitSuccess();
                this.getTags();
                this.loading = false;
                this.error = false;
            }, error => {
                self.error = 'Tag already exists';
                self.loading = false;
            }
        )
    }
    onDelete(row) {
        let confirmDelete: boolean = window.confirm("Are you sure you want to delete the \"" + row.name + "\" tag?");
        if (confirmDelete) {
            this.tagService.deleteTag(row.id).subscribe(
                (res) => {
                    this.submitSuccess();
                    this.getTags();
                }
            )
        }

    }
    private submitSuccess() {
        this.router.navigate(['admin/tags'])
    }
}