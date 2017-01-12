import { Component, Input, Output, EventEmitter, SimpleChange, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, TagService } from '../../_services/index';

@Component({
    selector: 'createnewuser',
    templateUrl: './createnewuser.component.html',
    styleUrls: ['./createnewuser.component.css']
})
export class CreateNewUserComponent implements OnInit {
    model: any = {};
    title = "Create New User"
    private role: boolean = false;
    private tagsContainer = [];
    private items: any = [];
    private item: any = [];
    private value: any = ['tag'];
    private itemsToStringTags: any;

    ngOnInit() {
        this.model.islocal = false;
        this.model.isadmin = false;
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
    register() {     
        this.userService.createUser(this.model).subscribe(
            (e) => {
                this.router.navigate(['/admin/users'])
            },
            err => {
                // Log errors if any
                console.log(err);
            })

    }
    private selectedTag: any;
    public selected(value: any): void {
        this.selectedTag = value;
    }

    public removed(value: any): void {
        // console.log('Removed value is: ', value);
    }
    private tagError : boolean;
    public refreshValue(value: any): void {
        this.value = value;
        if (this.value.length > 0) {
            this.value.forEach(
                (e) => {
                    this.tagsContainer.push({ id: e.id, name: e.text });

                })
        } else {
            this.model.tags = [];
        }
        this.model.tags = this.tagsContainer;
        this.tagsContainer = [];
        if(this.model.tags.length<1){
            this.tagError = true;
        }else{
            this.tagError = false;
        }
        return this.model.tags;
    }

    public itemsToString(value: Array<any> = []): string {

        this.itemsToStringTags = value
            .map((item: any) => {
                return item.text;
            }).join(',');

        return this.itemsToStringTags;
    }
    constructor(
        private router: Router,
        private userService: UserService,
        private tagService: TagService
    ) { }
}

