import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {Md2Module} from 'md2';
import { OverTimeComponent } from './over-time.component';
import {OverTimeRoutingModule} from './over-time.routing.module';
import { AddOverTimeComponent } from './add-over-time/add-over-time.component';
import { AllOverTimeComponent } from './all-over-time/all-over-time.component';

@NgModule({
  imports: [
    CommonModule,
    OverTimeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    Md2Module.forRoot()
  ],
  declarations: [OverTimeComponent, AddOverTimeComponent, AllOverTimeComponent]
})
export class OverTimeModule { }
