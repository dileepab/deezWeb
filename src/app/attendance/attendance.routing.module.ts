import { Routes, RouterModule } from '@angular/router';
import {AddAttendanceComponent} from './add-attendance/add-attendance.component';
import {AuthGuard} from '../services/auth.guard';
import {ViewAttendanceComponent} from './view-attendance/view-attendance.component';


const attendanceRoutes: Routes = [
  { path: 'addAttendance', canActivate: [AuthGuard], component: AddAttendanceComponent },
  { path: 'viewAttendance', canActivate: [AuthGuard], component: ViewAttendanceComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'viewAttendance' }
];

export const AttendanceRoutingModule = RouterModule.forChild(attendanceRoutes);
