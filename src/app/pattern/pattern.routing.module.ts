import {AddPatternComponent} from './add-pattern/add-pattern.component';
import {AuthGuard} from '../services/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {ViewPatternComponent} from './view-pattern/view-pattern.component';
import {AllPatternComponent} from './all-pattern/all-pattern.component';
const patternRoutes: Routes = [
  { path: 'allPatterns', canActivate: [AuthGuard], component: AllPatternComponent },
  { path: 'addPattern', canActivate: [AuthGuard], component: AddPatternComponent },
  { path: 'viewPattern/:id', canActivate: [AuthGuard], component: ViewPatternComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'allPatterns' }
];

export const PatternRoutingModule = RouterModule.forChild(patternRoutes);
