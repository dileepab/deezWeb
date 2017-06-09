import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import {SDKBrowserModule} from '../shared/sdk/index';
import {FormsModule} from '@angular/forms';
import {Md2Module} from 'md2';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AttendanceRoutingModule} from './attendance.routing.module';
import {SalarySlipDialogComponent, ViewAttendanceComponent} from './view-attendance/view-attendance.component';

@NgModule({
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SDKBrowserModule,
    FormsModule,
    Md2Module,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [AddAttendanceComponent, ViewAttendanceComponent, SalarySlipDialogComponent],
  entryComponents: [SalarySlipDialogComponent]
})
export class AttendanceModule { }
