import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTargetComponent } from './add-target/add-target.component';
import { ViewTargetComponent } from './view-target/view-target.component';
import {TargetRoutingModule} from './target.routing.module';

@NgModule({
  imports: [
    CommonModule,
    TargetRoutingModule
  ],
  declarations: [AddTargetComponent, ViewTargetComponent]
})
export class TargetModule { }
