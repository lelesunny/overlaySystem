import { Component, Output, OnInit, NgZone, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'


@Component({
  selector: 'newLab-form',
  templateUrl: './newLab.component.html',
  styleUrls: ['./newLab.component.css']

})
export class NewLabForm implements OnInit {
  LabFormVali: FormGroup;
  private newLab: any = {};
  private value: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() loading: boolean;
  @Input() templates: any = [];
  private activeData: any = [];

  defaultAddNewLab() {
    this.LabFormVali.reset();
    this.activeData = []
  }


  constructor(
    formbuilder: FormBuilder,
    private router: Router,
    private zone: NgZone
  ) {
    this.LabFormVali = formbuilder.group({
      'name': [null, Validators.required],
    })
  }
  private original: any;
  ngOnInit() {
    this.defaultAddNewLab();

  }
  submitForm(value: any) {
    this.newLab = value;
    this.newLab.blueprintid = this.value;
    this.newLab.instructions = "Test Instructions";
    this.onSubmit.emit(this.newLab)
  }
  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }
  public templateValue(value: any): void {
    this.value = value.id;
  }

  public refreshValue(value: any): void {
    // this.templates = value;
  }
  public typed(value: any): void {
  }
  public itemsToString(value: Array<any> = []): string {

    return value
      .map((item: any) => {
        return item.id;
      }).join(',');
  }
}