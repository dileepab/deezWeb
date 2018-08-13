import {AddTargetComponent} from './add-target/add-target.component';
import {ViewTargetComponent} from './view-target/view-target.component';
import {AuthGuard} from '../services/auth.guard';
import {RouterModule, Routes} from '@angular/router';

const targetRoutes: Routes = [
  { path: 'viewTarget', canActivate: [AuthGuard], component: ViewTargetComponent },
  { path: 'addTarget', canActivate: [AuthGuard], component: AddTargetComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'viewTarget' }
];

export const TargetRoutingModule = RouterModule.forChild(targetRoutes);
