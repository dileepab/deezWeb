import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {TitleService} from '../../services/title.service';
import {EmployeeApi} from '../../shared/sdk/services/custom/Employee';
import {Employee} from '../../shared/sdk/models/Employee';
import {PatternApi} from '../../shared/sdk/services/custom/Pattern';
import {Pattern} from '../../shared/sdk/models/Pattern';

@Component({
  selector: 'app-add-target',
  templateUrl: './add-target.component.html',
  styleUrls: ['./add-target.component.css']
})
export class AddTargetComponent implements OnInit {

  public employees: Employee[] = [];
  public patterns: Pattern[] = [];
  public targets: Pattern[] = [];
  public date: Date = new Date()

  constructor(
    private employeeApi: EmployeeApi,
    private patternApi: PatternApi,
    private titleService: TitleService,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.titleService.sendTitle('Add Target');

    this.employeeApi.find().subscribe(
      (res: any) => {
        this.employees = res;
      },
      err => {
        console.log(err);
      }
    );

    this.patternApi.find().subscribe(
      (res: any) => {
        this.patterns = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  createTargets() {
    for (const employee of this.employees) {
      this.targets.push();
    }
  }

}
