
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'lab-extend',
  templateUrl: './labExtend.component.html',
  styleUrls: ['./labExtend.component.css']
})
export class LabExtendComponent implements OnInit {
  complexForm: FormGroup;
  @Input() selectedUser: any = {};
  @Input() extendOptions: any = {};
  @Input() loadingextend: boolean;
  @Input() abc: boolean;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  private selected: any = {};



  ngOnInit() {

  }

  constructor(fb: FormBuilder) {
    this.complexForm = fb.group({
      'extend': [null, Validators.required],
    })
    // console.log(this.complexForm);
    // this.complexForm.valueChanges.subscribe((form: any) => {
    //   console.log('form changed to:', form);
    // }
    // );
  }

  submitForm(value: any) {
    let self = this;
    this.selected.id = this.selectedUser.id;
    this.onSubmit.emit(this.selected)
    setTimeout(function () {
      if (!this.loadingextend) {
        self.onClose.emit()
      }
    }, 300);



  }
  getValue(va) {
    this.selected.selectedOption = va;
  }
}
