import {AuthGuard} from '../../services/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from './employee.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {AllEmployeesComponent} from './all-employees/all-employees.component';
import {ViewEmployeeComponent} from './view-employee/view-employee.component';
const employeeRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: EmployeeComponent
  },
  {
    path: 'allEmployees',
    canActivate: [AuthGuard],
    component: AllEmployeesComponent
  },
  {
    path: 'addEmployee',
    canActivate: [AuthGuard],
    component: AddEmployeeComponent
  },
  {
    path: 'viewEmployee/:id',
    canActivate: [AuthGuard],
    component: ViewEmployeeComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

export const EmployeeRoutingModule = RouterModule.forChild(employeeRoutes);
