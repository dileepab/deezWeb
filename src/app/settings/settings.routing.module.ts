import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../services/auth.guard';
import {SettingsComponent} from './settings.component';

const settingsRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: SettingsComponent
  },
  {
    path: 'employee',
    loadChildren: 'app/settings/employee/employee.module#EmployeeModule'
  },
  {
    path: 'holiday',
    loadChildren: 'app/settings/holiday/holiday.module#HolidayModule'
  },
  {
    path: 'overTime',
    loadChildren: 'app/settings/over-time/over-time.module#OverTimeModule'
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

export const SettingsRoutingModule = RouterModule.forChild(settingsRoutes);
