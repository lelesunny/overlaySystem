import { Component, Output, OnInit, NgZone, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
    selector: 'template-data',
    templateUrl: './TemplateData.component.html',
    styleUrls: ['./TemplateData.component.css']

})

export class TemplateData implements OnInit {
    @Input() selectedUser: any = {};
    @Input() templateData: any = {};
    @Output() onSend: EventEmitter<any> = new EventEmitter();
    private isEdit: boolean;
    private buttonData: string = 'Edit';
    private inst: any;


    onEdit() {
        if (this.isEdit) {
            this.buttonData = 'Edit';
        } else {
            this.buttonData = 'cancel';
            this.inst = this.selectedUser.instructions;
        }
    }
    ngOnInit() {
        this.isEdit = true;
        this.openEmailT();
     }
     openEmailT(){
         this.isEdit = true;
         this.buttonData = 'Edit';
     }


    constructor() { }
    onSubmit() {
        console.log("11111", this.inst)
        this.onSend.emit(this.inst)
    }

}