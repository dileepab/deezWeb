import { Routes, RouterModule } from '@angular/router';
import {AddCutComponent} from './add-cut/add-cut.component';
import {ViewCutComponent} from './view-cut/view-cut.component';
import {AllCuttsComponent} from './all-cutts/all-cutts.component';
import {AuthGuard} from '../services/auth.guard';


const cutRoutes: Routes = [
    { path: 'allCuts', canActivate: [AuthGuard], component: AllCuttsComponent },
    { path: 'addCut', canActivate: [AuthGuard], component: AddCutComponent },
    { path: 'viewCut/:id', canActivate: [AuthGuard], component: ViewCutComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'allCuts' }
];

export const CutRoutingModule = RouterModule.forChild(cutRoutes);
