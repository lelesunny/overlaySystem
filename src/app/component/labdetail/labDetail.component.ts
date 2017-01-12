import { Component, Output, OnInit, NgZone,EventEmitter,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'


@Component({
  selector: 'lab-detail',
  templateUrl: './labDetail.component.html',
  styleUrls: ['./labDetail.component.css']

})
export class LabDetailComponent implements OnInit {
  @Input() selectedUser: any = {};
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();


  ngOnInit() {}

  constructor() {}

}