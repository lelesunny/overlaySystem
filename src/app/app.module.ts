import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap'
import { Angular2DataTableModule } from 'angular2-data-table';
import { routing } from './app.routing';

import { SelectModule } from 'ng2-select';

import { APP_CONFIG, AppConfig } from './app.config';
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { AuthenticationService, UserService, TagService, LabService, SettingService, InstructionService, UserInfoService } from './_services/index';
import { LoginComponent, CreateNewUserComponent, PostLoginComponent, SSOLoginSucComponent } from './login/index';
import { AuthGuard } from './_guards/index';

import { NavMenu, NavHeader } from './nav/index'
import {
  DottedBorderComponent, UsertabComponent, TagFrom, NewLabForm, LabExtendComponent,
  LabSaveComponent, LabDetailComponent, TemplateData, OptionOpenComponent, UserHistoryComponent, AdminUserHistoryComponent, TableComponent, ScheduleLabComponent
} from './component/index'
import { AppComponent } from './app.component';
import {
  HomeComponent,
  InstructionComponent,
  AccountComponent,
  HelpComponent
} from './user/index'

import {
  AdminUsersComponent,
  AdminHomeComponent,
  AdminBulkCreateComponent,
  AdminReportsComponent,
  AdminSettingComponent,
  AdminTagsComponent,
  AdminTemplatesComponent,
  AdminBulkCreateHistoryComponent
} from './admin/index'

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    InstructionComponent,
    AccountComponent,
    HelpComponent,
    LoginComponent,
    CreateNewUserComponent,
    PostLoginComponent,
    SSOLoginSucComponent,
    HomeComponent,
    NavMenu,
    NavHeader,
    TagFrom,
    NewLabForm,
    LabExtendComponent,
    LabSaveComponent,
    LabDetailComponent,
    TemplateData,
    OptionOpenComponent,
    UserHistoryComponent,
    AdminUserHistoryComponent,
    UsertabComponent,
    TableComponent,
    ScheduleLabComponent,
    DottedBorderComponent,
    AdminUsersComponent,
    AdminHomeComponent,
    AdminBulkCreateComponent,
    AdminReportsComponent,
    AdminSettingComponent,
    AdminTagsComponent,
    AdminTemplatesComponent,
    AdminBulkCreateHistoryComponent, FileSelectDirective, FileDropDirective,
    // SelectComponent

  ],

  imports: [
    BrowserModule,
    Angular2DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule,
    routing,
    SelectModule,
  ],

  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    TagService,
    LabService,
    SettingService,
    InstructionService,
    UserInfoService,
    //fakeBackendProvider,
    //MockBackend,
    BaseRequestOptions,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: APP_CONFIG, useValue: AppConfig }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
