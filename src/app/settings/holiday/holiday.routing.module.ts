import {AuthGuard} from '../../services/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {HolidayComponent} from './holiday.component';
import {AddHolidayComponent} from './add-holiday/add-holiday.component';
import {AllHolidaysComponent} from './all-holidays/all-holidays.component';
const holidayRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HolidayComponent
  },
  {
    path: 'allHolidays',
    canActivate: [AuthGuard],
    component: AllHolidaysComponent
  },
  {
    path: 'addHoliday',
    canActivate: [AuthGuard],
    component: AddHolidayComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

export const HolidayRoutingModule = RouterModule.forChild(holidayRoutes);
