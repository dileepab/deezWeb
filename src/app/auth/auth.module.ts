import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthRoutingModule} from './auth.routing.module';
import {SDKBrowserModule} from '../shared/sdk/index';
import {FormsModule} from '@angular/forms';
import {Md2Module} from 'md2';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SDKBrowserModule,
    FormsModule,
    Md2Module.forRoot(),
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [LoginComponent, SignUpComponent, ResetPasswordComponent, ChangePasswordComponent, LogoutComponent]
})
export class AuthModule { }
