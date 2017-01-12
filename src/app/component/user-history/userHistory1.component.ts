import { Component, Output, OnInit, NgZone, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';



@Component({
  selector: 'admin-history',
  templateUrl: './userHistory.component.html',
  styleUrls: ['./userHistory.component.1.css']

})
export class AdminUserHistoryComponent implements OnInit {
  @Input() userHistory: any = [];
  @Input() historyLoading: boolean;
  private scroll:boolean = true;
  historyOptions = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 43,
    footerHeight: 0,
    rowHeight: 38,
    loadingIndicator: true,
  });
  constructor() {}
  ngOnInit() { 
    this.scroll = true;
  }

}