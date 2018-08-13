import { Component, OnInit } from '@angular/core';
import {EmployeeApi} from '../../../shared/sdk/services/custom/Employee';
import {Employee} from '../../../shared/sdk/models/Employee';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public employee: Employee = new Employee();
  public loading = false;

  constructor(private employeeApi: EmployeeApi,
              public snackBar: MdSnackBar,
              public router: Router) { }

  ngOnInit() {
  }

  addEmployee(): void {
    this.loading = true;
    this.employee.isActive = true;
    this.employeeApi.create(this.employee).subscribe(
      (res: any) => {
        this.employee = new Employee();
        this.loading = false;
        this.snackBar.open('Successfully Added', 'DISMISS', <MdSnackBarConfig>{
          duration: 5000,
        });
      },
      err => {
        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection',
          (err.statusCode === 401 ? this.router.navigate(['/auth/logout']) : false) && 'DISMISS', <MdSnackBarConfig>{
            duration: 5000
          });
        this.loading = false;
      }
    );
  }

}
