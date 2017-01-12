import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'form-tag',
  templateUrl: './tag.form.component.html',
  styleUrls: ['./tag.form.component.css']

})
export class TagFrom implements OnInit {
  tagFromV: FormGroup;
  @Input() loading: boolean;
  @Input() error: any;


  ngOnInit() {
  }
  constructor(fb: FormBuilder) {
    this.tagFromV = fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.required],
      'tagtype': [null, Validators.required],

    })
    // this.tagFromV.valueChanges.subscribe( (form: any) => {
    //   console.log('form changed to:', form);
    // }

  }
  private customTag: any = {};
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  submitForm(value: any) {
    console.log(value);
    this.customTag = value;
    this.customTag.isprebuilt = false;
    this.onSubmit.emit(this.customTag);
  }
  defaultCustomTag(){
    this.tagFromV.reset()
  }
}