import { Component, Output, OnInit, NgZone, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'


@Component({
  selector: 'option-open',
  templateUrl: './option-open.component.html',
  styleUrls: ['./option-open.component.css']

})
export class OptionOpenComponent implements OnInit {
  private model: any = {};
  private value: any;
  private emailTemplateText: string;


  // tagFromV: FormGroup;
  // private customTag: any = {};
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() dropdownData: any;
  @Input() title: any;
  @Input() optimizeOptions: any;
  @Input() selectedUser: any = {};
  @Input() emailList: any = {};
  @Input() dropdownTitle: any = {};
  // private optimizationlevel:string;
  @Input() emailOriginal: any;


  constructor() {
  }
  public selected(value: any): void {

    if (this.emailList.length && this.model.optimizationlevel == 'Optional') {
      this.emailList.forEach(
        e => {
          if (e.id == value.id) {
            this.emailTemplateText = e.templatetext;
          }
        }
      )
    }

  }

  defaultEmailTemplate() {
    this.model.optimizationlevel = 'Optional';
    this.emailOriginal = this.emailList;
    this.model.customEmailTitle = '';
    this.model.customEmailData = '';

  }
  public removed(value: any): void { }
  public typed(value: any): void { }

  public refreshValue(value: any): void {
    this.value = value;
  }
  public regionValue(value: any): void {
    this.model.region = value.id;
  }
  ngOnInit() {
    this.model.optimizationlevel = 'C';
  }

  onsubmit() {
    this.onSubmit.emit(this.model)
  }

}