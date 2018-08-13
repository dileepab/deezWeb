import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCutComponent } from './add-cut/add-cut.component';
import { ViewCutComponent } from './view-cut/view-cut.component';
import {CutRoutingModule} from './cut.routing.module';
import {SDKBrowserModule} from '../shared/sdk/index';
import {FormsModule} from '@angular/forms';
import {MaterialModule, MdDialogModule} from '@angular/material';
import {Md2Module} from 'md2';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AllCuttsComponent, ConfirmDialogComponent, RevenueDialogComponent} from './all-cutts/all-cutts.component';

@NgModule({
  imports: [
    CommonModule,

    CutRoutingModule,
    SDKBrowserModule,
    FormsModule,
    Md2Module.forRoot(),
    MaterialModule,
    FlexLayoutModule,
    MdDialogModule
  ],
  declarations: [AddCutComponent, ViewCutComponent, AllCuttsComponent, RevenueDialogComponent, ConfirmDialogComponent],
  entryComponents: [RevenueDialogComponent, ConfirmDialogComponent]
})
export class CutModule { }
