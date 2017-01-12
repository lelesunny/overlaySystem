import { Component, Output, OnInit, NgZone, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';



@Component({
  selector: 'user-history',
  templateUrl: './userHistory.component.html',
  styleUrls: ['./userHistory.component.css']

})
export class UserHistoryComponent implements OnInit {
  @Input() userHistory: any = [];
  @Input() historyLoading: boolean;

  historyOptions = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 43,
    footerHeight: 0,
    rowHeight: 38,
    loadingIndicator: true,
    scrollbarV: true
  });
  constructor() {}
  ngOnInit() { }

}