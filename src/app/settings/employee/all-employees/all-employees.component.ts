import { Component, OnInit } from '@angular/core';
import {EmployeeApi} from '../../../shared/sdk/services/custom/Employee';
import {Employee} from '../../../shared/sdk/models/Employee';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {

  public employees: Array<Employee>;

  constructor(private employeeApi: EmployeeApi) { }

  ngOnInit() {
    this.employeeApi.find().subscribe(
      (res: any) => {
        this.employees = res;
      },
      err => {
        console.log(err);
      }
    );
  }

}
