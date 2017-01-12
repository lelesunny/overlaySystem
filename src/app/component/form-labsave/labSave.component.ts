import { Component, Output, OnInit, NgZone,EventEmitter,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'


@Component({
  selector: 'lab-save',
  templateUrl: './labSave.component.html',
  styleUrls: ['./labSave.component.css']

})
export class LabSaveComponent implements OnInit {
  @Input() selectedUser: any = {};
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  private selected:any={};
  private labname:any;

  default(){
    this.labname = '';
  }

  ngOnInit() {}

  constructor() {}

  submitForm(value: any) {
    this.selected.id = this.selectedUser.id;
    this.selected.name = {name:this.labname};
    this.onSubmit.emit(this.selected)
  }
}