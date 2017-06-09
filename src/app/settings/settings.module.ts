import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {SettingsRoutingModule} from './settings.routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
