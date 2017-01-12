import { Component, Output, OnInit, NgZone, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthenticationService } from '../../_services/authentication.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { FileUploader } from 'ng2-file-upload';


const URL = 'https://ravellotom.us-east-1.elasticbeanstalk.com/api/a/labs/';

@Component({
  selector: 'schedulelab',
  templateUrl: './schedulelab.component.html',
  styleUrls: ['./schedulelab.component.css']

})


export class ScheduleLabComponent implements OnInit {
  private model: any = {};

  public optimizeOptions = [
    { value: 'C', display: 'Cost' },
    { value: 'P', display: 'Performance' }
  ];
  hours = ["1", "2", "3", "4", "5", "6", "7", "8"]
  days = ["1", "2", "3", "4", "5", "6", "7", "8"]
  // private customTag: any = {};
  @Output() onSchedule: EventEmitter<any> = new EventEmitter();
  @Input() userHistory: any = [];
  @Input() scheduleLoading: boolean;
  @Input() regions: any = [];
  @Input() timezones: any = [];
  private scheTemp: any = [];
  private date: any;
  private time: any;
  private isSchedule: any = {}
  private value: any = {};
  private hour: any;
  private hoursActive: any = [];
  private timezoneActive: any = [];
  private regionActive: any = [];



  defaultSchedule() {
    this.model = {};
    this.hoursActive = [];
    this.timezoneActive = [];
    this.regionActive = [];
    this.scheTemp = [];
    this.model.optimizationlevel = 'C'

  }

  constructor() { }
  ngOnInit() {
    this.model.optimizationlevel = 'C'
  }
  public selected(value: any): void { }
  public selectedHour(value: any): void {
    this.hour = value;
  }
  public refreshData(val: any): void {
    this.model.schedule = null;
    // console.log(this.model);
  }

  public removed(value: any): void { }
  public typed(value: any): void { }

  public refreshValue(value: any): void {
    this.value = value;
  }
  public timezoneValue(value: any): void {
    this.model.timezone = value.text;
  }
  public regionValue(value: any): void {
    this.model.region = value.text;
  }
  // add start date time and duration to the above list 
  addDate(date, time) {
    // console.log("a",date,time)
    if (date && time && this.value.text) {
      // console.log("a",date,time)
      this.isSchedule = { startdate: date, starttime: time, duration: this.value.text }
      this.scheTemp.push(this.isSchedule)
      this.date = ""
      this.time = ""
      this.model.schedule = this.scheTemp;
    }
    this.hoursActive = [];
  }
  deleteSchedule(date) {
    let ar = this.model.schedule
    for (var i = 0; i < ar.length; i++) {
      if (ar[i].startdate == date.startdate && ar[i].starttime == date.starttime && ar[i].duration == date.duration) {
        ar.splice(i, 1);
      }
    }
  }
  go() {
    this.model.schoption = "A";
    this.onSchedule.emit(this.model);
  }

}