import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeComponent} from './employee.component';
import {EmployeeRoutingModule} from './employee.routing.module';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {FormsModule} from '@angular/forms';
import {Md2Module} from 'md2';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    Md2Module.forRoot()
  ],
  declarations: [EmployeeComponent, AddEmployeeComponent, AllEmployeesComponent, ViewEmployeeComponent]
})
export class EmployeeModule { }
