import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPatternComponent } from './add-pattern/add-pattern.component';
import { AllPatternComponent } from './all-pattern/all-pattern.component';
import { ViewPatternComponent } from './view-pattern/view-pattern.component';
import { PatternComponent } from './pattern.component';
import {PatternRoutingModule} from './pattern.routing.module';
import {FormsModule} from '@angular/forms';
import {SDKBrowserModule} from '../shared/sdk/index';
import {MdButtonModule, MdIconModule, MdInputModule, MdListModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PatternRoutingModule,
    SDKBrowserModule,
    FormsModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdListModule
  ],
  declarations: [AddPatternComponent, AllPatternComponent, ViewPatternComponent, PatternComponent]
})
export class PatternModule { }
