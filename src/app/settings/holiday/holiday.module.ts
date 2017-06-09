import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HolidayRoutingModule} from './holiday.routing.module';
import {HolidayComponent} from './holiday.component';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { AllHolidaysComponent } from './all-holidays/all-holidays.component';
import {Md2Module} from 'md2';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    HolidayRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    Md2Module.forRoot()
  ],
  declarations: [HolidayComponent, AddHolidayComponent, AllHolidaysComponent]
})
export class HolidayModule { }
