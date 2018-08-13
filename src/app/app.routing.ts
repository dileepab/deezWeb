import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddRoleComponent} from './add-role/add-role.component';
import {AuthGuard} from './services/auth.guard';


const appRoutes: Routes = [
  {path: '', canActivate: [AuthGuard], component: HomeComponent},
  // {
  //   path: 'pattern',
  //   loadChildren: 'app/pattern/pattern.module#PatternModule'
  // },
  {path: 'addRole', canActivate: [AuthGuard], component: AddRoleComponent},
  {
    path: 'cut',
    loadChildren: 'app/cut/cut.module#CutModule'
  },
  {
    path: 'attendance',
    loadChildren: 'app/attendance/attendance.module#AttendanceModule'
  },
  {
    path: 'settings',
    loadChildren: 'app/settings/settings.module#SettingsModule'
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: 'pattern',
    loadChildren: 'app/pattern/pattern.module#PatternModule'
  },
  {
    path: 'target',
    loadChildren: 'app/target/target.module#TargetModule'
  },

  // otherwise redirect to home
  {path: '**', redirectTo: 'pattern'}

];

export const RoutingModule = RouterModule.forRoot(appRoutes);
