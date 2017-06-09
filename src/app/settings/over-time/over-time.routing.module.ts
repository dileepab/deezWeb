import {AuthGuard} from '../../services/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {AddOverTimeComponent} from './add-over-time/add-over-time.component';
import {AllOverTimeComponent} from './all-over-time/all-over-time.component';
import {OverTimeComponent} from './over-time.component';
const overTimeRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: OverTimeComponent
  },
  {
    path: 'allOverTime',
    canActivate: [AuthGuard],
    component: AllOverTimeComponent
  },
  {
    path: 'addOverTime',
    canActivate: [AuthGuard],
    component: AddOverTimeComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

export const OverTimeRoutingModule = RouterModule.forChild(overTimeRoutes);
