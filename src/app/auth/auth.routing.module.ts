import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../services/auth.guard';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {LogoutComponent} from './logout/logout.component';


const AuthRoutes: Routes = [
  { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signUp', canActivate: [AuthGuard], component: SignUpComponent },
  { path: 'resetPassword', canActivate: [AuthGuard], component: ResetPasswordComponent },
  { path: 'changePassword/:access_token', canActivate: [AuthGuard], component: ChangePasswordComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

export const AuthRoutingModule = RouterModule.forChild(AuthRoutes);
