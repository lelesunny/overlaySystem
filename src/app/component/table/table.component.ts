import { Component, Output, OnInit, NgZone, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableOptions, SelectionType, TableColumn, ColumnMode, SortDirection } from 'angular2-data-table';
declare var $: any;

@Component({
  selector: 'bc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']

})
export class TableComponent implements OnInit {
  // private customTag: any = {};
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() userLabs: any = [{ name: '', status: '' }];
  data = [];
  // @Input() historyLoading:boolean;
  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 43,
    footerHeight: 10,
    rowHeight: 40,
    loadingIndicator: true,
    columns: [
      new TableColumn({ name: 'Name' }),
      new TableColumn({ name: 'status' }),
      new TableColumn({ name: 'Username' }),
      new TableColumn({ name: 'Starttime' }),
      new TableColumn({ name: 'Endtime' }),
    ],
  });
  private selectedUser: any;
  private stopData: any = {};

  onSave(row) {
    this.stopData.id = row.id
    this.stopData.username = row.username;
    this.stopData.date = "";
    this.stopData.time = ""
    
  }
  close() {
    $("#stack2").modal("hide")
  }
  submit() {
    this.onSubmit.emit(this.stopData)
    this.close();
  }
  constructor() { }
  ngOnInit() { }

}