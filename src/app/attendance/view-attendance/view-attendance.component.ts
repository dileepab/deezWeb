import {Component, OnInit} from '@angular/core';
import {Employee} from '../../shared/sdk/models/Employee';
import {EmployeeApi} from '../../shared/sdk/services/custom/Employee';
import {TitleService} from '../../services/title.service';
import {AttendanceApi} from '../../shared/sdk/services/custom/Attendance';
import {Attendance} from '../../shared/sdk/models/Attendance';
import {HolidayApi} from '../../shared/sdk/services/custom/Holiday';
import {Holiday} from '../../shared/sdk/models/Holiday';
import {OverTimeApi} from '../../shared/sdk/services/custom/OverTime';
import {OverTime} from '../../shared/sdk/models/OverTime';
import {MdDialog, MdDialogConfig, MdDialogRef, MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {

  public employees: Employee[] = Array<Employee>();
  public selectedEmployee: Employee;
  public attendanceHeader: any = ['DATE', 'IN', 'OUT', 'LATE TIME', 'STATUS'];
  public attendanceBody: any = [];
  public attendances: any = [];
  public attendance: Attendance;

  public holidays: Array<Holiday>;
  public overTimes: Array<OverTime>;
  public currentMonth: Array<any> = [];

  public startDate: any;
  public endDate: any;
  public minDate: any;
  public maxDate: any;

  public showFilter = false;
  public leave: any;
  public workDays: any;
  public lateTime: any;
  public otTime: any;
  public incentive: any = 0;

  public businessDays: any;
  public basicSalary: any;
  public overTime: any;
  public leavePenalty: any;
  public latePenalty: any;
  public attendanceBonus: any;
  public workingDays = 26;

  constructor(private titleService: TitleService, private employeeApi: EmployeeApi,
              private attendanceApi: AttendanceApi, private holidayApi: HolidayApi, private overTimeApi: OverTimeApi,
              public dialog: MdDialog,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {

    const date = new Date();
    this.startDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    this.endDate = new Date(date.getFullYear(), date.getMonth() , 1);

    this.titleService.sendTitle('View Attendance');

    this.employeeApi.find().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      }
    );
    this.changeDate();
  }

  updateTime(row: any): void {
    if (row.inTimeEdit) {
      console.log(row.inTime.dateTime);
      row.inTime.dateTime = new Date(row.inTime.dateTime);
      console.log(row.inTime.dateTime);
      this.attendanceApi.patchOrCreate(row.inTime).subscribe(
        (attendance: Attendance) => {
          this.changeEmployee();
          row.inTimeEdit = false;
          row.outTimeEdit = false;
        },
        err => {
          this.snackBar.open(err.message ? err.message : 'Error Occurred. Check Your Internet Connection', 'DISMISS', {
            duration: 5000,
          });
        });
    }
    if (row.outTimeEdit) {
      this.attendanceApi.patchOrCreate(row.outTime).subscribe(
        (attendance: Attendance) => {
          this.changeEmployee();
          row.inTimeEdit = false;
          row.outTimeEdit = false;
        },
        err => {
          this.snackBar.open(err.message ? err.message : 'Error Occurred. Check Your Internet Connection', 'DISMISS', {
            duration: 5000,
          });
        });
    }
    // this.attendance = new Attendance();
    // this.attendance.name = this.attendances[0].name;
    // this.attendance.uid = this.attendances[0].uid;
    // this.attendance.employeeId = this.attendances[0].uid;
    // this.attendance.dateTime = new Date(newAttendance);

  }


  // getMinDate
  changeAttendance(row: any) {
    this.minDate = new Date(row.date);
    this.maxDate = new Date(new Date(row.date).setDate(new Date(row.date).getDate() + 1));
    if (row.inTimeEdit) {
      if (!row.inTime.dateTime) {
        row.inTime = new Attendance();
        row.inTime.dateTime = new Date(row.date);
        row.inTime.employeeId = this.selectedEmployee.id;
        row.inTime.uid = this.selectedEmployee.uid;
      }
    }
    if (row.outTimeEdit) {
      if (!row.outTime.dateTime) {
        row.outTime = new Attendance();
        row.outTime.dateTime = new Date(row.date);
        row.outTime.employeeId = this.selectedEmployee.id;
        row.outTime.uid = this.selectedEmployee.uid;
      }
    }
  }

  changeDate(): void {
    this.currentMonth = [];
    const strtDate = new Date(this.startDate);
    for (const i = strtDate; i <= this.endDate; strtDate.setDate(strtDate.getDate() + 1)) {
      if (!(strtDate.getDay() === 6 || strtDate.getDay() === 0)) {
        this.currentMonth.push({
          holiday: [],
          overtime: [],
          weekend: false
        });
      } else {
        this.currentMonth.push({
          holiday: [],
          overtime: [],
          weekend: true
        });
      }
    }

    // get holidays
    this.holidayApi.find({
      'where': {
        'date': {
          between: [this.startDate.setHours(0, 0, 0, 0), this.endDate.setHours(0, 0, 0, 0) + 1000 * 60 * 60 * 24]
        }
      }
    }).subscribe(
      (res: Holiday[]) => {
        this.holidays = res;
        for (let i = 0; i <= this.holidays.length - 1; i++) {
          const date = new Date(this.holidays[i].date).getDate();
          this.currentMonth[date - 1].holiday.push(this.holidays[i]);
        }
      },
      err => {
        console.log(err);
      }
    );

    // get OverTimes
    this.overTimeApi.find({
      'where': {
        'date': {
          between: [this.startDate.setHours(0, 0, 0, 0), this.endDate.setHours(0, 0, 0, 0) + 1000 * 60 * 60 * 24]
        }
      }
    }).subscribe(
      (res: OverTime[]) => {
        this.overTimes = res;
        for (let i = 0; i <= this.overTimes.length - 1; i++) {
          const date = new Date(this.overTimes[i].date).getDate();
          this.currentMonth[date - 1].overtime.push(this.overTimes[i]);
        }
      },
      err => {
        console.log(err);
      }
    );

    if (this.selectedEmployee) {
      this.changeEmployee();
    }
  };

  changeEmployee(): void {
    if (this.selectedEmployee.uid) {
      this.attendanceApi.find(
        {
          'where': {
            and: [
              {
                'dateTime': {
                  between: [this.startDate.setHours(0, 0, 0, 0), this.endDate.setHours(0, 0, 0, 0) + 1000 * 60 * 60 * 24]
                }
              },
              {'uid': this.selectedEmployee.uid}
            ]
          }
        }).subscribe(
        (attendances: Attendance[]) => {
          // this.attendances = attendances;
          this.attendanceBody = [];
          this.attendances = [];
          this.leave = 0;
          this.attendanceBonus = 2000;
          this.workDays = 0;
          this.lateTime = 0;
          this.otTime = 0;

          const strtDate = new Date(this.startDate);

          for (const i = strtDate; i <= this.endDate; strtDate.setDate(strtDate.getDate() + 1)) {
            let row: any;
            const times = [];
            for (let j = 0; j < attendances.length; ++j) {
              if (new Date(attendances[j].dateTime).setHours(0, 0, 0, 0) === strtDate.setHours(0, 0, 0, 0)) {
                times.push(attendances[j]);
              }
            }

            times.sort(function (a, b) {
              return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
            });

            // Calculate Leave and lateTime
            const attendanceDate = new Date(i).toISOString();
            let inTime;
            let outTime;

            if (times.length > 0) {
              inTime = times[0];
              outTime = times.length > 1 ? times[times.length - 1] : new Attendance();
              row = {date: attendanceDate, inTime: inTime, outTime: outTime, inTimeEdit: false, lateTime: 0};
              this.attendances.push(row);

            } else {
              row = {
                date: attendanceDate,
                inTime: new Attendance(),
                outTime: new Attendance(),
                inTimeEdit: false,
                lateTime: 0
              };
              this.attendances.push(row);
            }

            // this.attendanceBody.push(this.attendances);

          }

          for (let date = 0; date < this.currentMonth.length - 1; date++) {

            const weekEnd = this.currentMonth[date].weekend;
            const holiday = this.currentMonth[date].holiday;
            const overTime = this.currentMonth[date].overtime;

            const inTime = this.attendances[date].inTime.dateTime;
            const outTime = this.attendances[date].outTime.dateTime;

            const attendanceStartTime = new Date(inTime).getTime();
            const attendanceEndTime = new Date(outTime).getTime();

            // check date is not weekend && not holiday && not overtime (normal working day)
            if (!weekEnd && holiday.length === 0) {

              // check attendance exist
              if (!inTime) {
                this.attendances[date].status = 'LEAVE';
                this.leave++;
                // this.calculateAttendanceBonus();
              } else if (inTime) {

                // check intime
                if (attendanceStartTime > new Date(new Date(this.attendances[date].date).setHours(13, 0, 0, 0)).getTime()) {
                  this.attendances[date].status = 'LEAVE';
                  this.leave++;
                  // this.calculateAttendanceBonus();
                } else if (attendanceStartTime > new Date(new Date(this.attendances[date].date).setHours(12, 0, 0, 0)).getTime()) {
                  this.leave += .5;
                  this.workDays += .5;
                  // this.calculateAttendanceBonus();
                  this.attendances[date].status = 'HALF DAY MO..';
                } else if (attendanceStartTime > new Date(new Date(this.attendances[date].date).setHours(8, 0, 0, 0)).getTime()) {
                  const lateTime = attendanceStartTime - new Date(new Date(this.attendances[date].date).setHours(8, 0, 0, 0)).getTime();
                  this.attendances[date].lateTime += lateTime;
                  this.lateTime += lateTime;
                  this.workDays += 1;
                }
              }

              // check out time
              if (outTime) {
                if (attendanceEndTime < new Date(new Date(this.attendances[date].date).setHours(12, 0, 0, 0)).getTime()) {
                  this.attendances[date].status = 'LEAVE';
                  this.leave++;
                  // this.calculateAttendanceBonus();
                } else if (attendanceEndTime < new Date(new Date(this.attendances[date].date).setHours(14, 0, 0, 0)).getTime()) {
                  this.leave += .5;
                  this.workDays += .5;

                  if (attendanceEndTime < new Date(new Date(this.attendances[date].date).setHours(13, 0, 0, 0)).getTime()) {
                    const lateTime = new Date(new Date(this.attendances[date].date).setHours(13, 0, 0, 0)).getTime() - attendanceEndTime;
                    this.attendances[date].lateTime += lateTime;
                    this.lateTime += lateTime;
                  }
                  // this.calculateAttendanceBonus();
                  this.attendances[date].status = 'HALF DAY EV..';
                } else if (attendanceEndTime < new Date(new Date(this.attendances[date].date).setHours(18, 0, 0, 0)).getTime()) {
                  const lateTime = new Date(new Date(this.attendances[date].date).setHours(18, 0, 0, 0)).getTime() - attendanceEndTime;
                  this.attendances[date].lateTime += lateTime;
                  this.lateTime += lateTime;
                  this.workDays += 1;
                }
              }

              if (overTime.length !== 0) {

                for (let i = 0; i < overTime.length; i++) {

                  const otStartTime = new Date(overTime[i].startTime).getTime();
                  const otEndTime = new Date(overTime[i].endTime).getTime();

                  if (otStartTime >= attendanceStartTime && otEndTime <= attendanceEndTime) {
                    this.otTime += (otEndTime - otStartTime);
                    this.attendances[date].status = 'OT Ev.. ';
                  } else if (otStartTime < attendanceStartTime && otEndTime < attendanceEndTime) {
                    this.otTime += (otEndTime -  attendanceStartTime > 1000 * 60 * 20 ? otEndTime -  attendanceStartTime : 0);
                    this.attendances[date].status = 'OT Ev.. ';
                  } else if (otStartTime > attendanceStartTime && otEndTime > attendanceEndTime) {
                    if ((attendanceEndTime -  otStartTime) > 1000 * 60 * 20) {
                      this.otTime += (attendanceEndTime -  otStartTime);
                      this.attendances[date].status = 'OT Ev.. ';
                    }
                  } else if (otStartTime < attendanceStartTime && otEndTime > attendanceEndTime) {

                    if ((attendanceEndTime - attendanceStartTime) > 1000 * 60 * 60) {
                      this.otTime += (attendanceEndTime - attendanceStartTime);
                      this.attendances[date].status = 'OT Ev.. ';
                    }
                  } else {
                    this.attendances[date].status = 'OT LEAVE';
                  }
                }
              }

            } else if ((weekEnd || holiday.length !== 0) && overTime.length !== 0) {

              const otStartTime = new Date(overTime[0].startTime).getTime();
              const otEndTime = new Date(overTime[0].endTime).getTime();

              if (inTime && outTime) {
                if (otStartTime >= attendanceStartTime && otEndTime <= attendanceEndTime) {
                  this.otTime += (otEndTime - otStartTime);
                  this.attendances[date].status = 'OT..';
                } else if (otStartTime < attendanceStartTime && otEndTime <= attendanceEndTime) {
                  this.otTime += (otEndTime -  attendanceStartTime);
                  this.attendances[date].status = 'OT..';
                } else if (otStartTime >= attendanceStartTime && otEndTime > attendanceEndTime) {
                  if ((attendanceEndTime -  otStartTime) > 1000 * 60 * 60) {
                    this.otTime += (attendanceEndTime -  otStartTime);
                    this.attendances[date].status = 'OT..';
                  }
                } else if (otStartTime < attendanceStartTime && otEndTime > attendanceEndTime) {

                  if ((attendanceEndTime - attendanceStartTime) > 1000 * 60 * 60) {
                    this.otTime += (attendanceEndTime - attendanceStartTime);
                    this.attendances[date].status = 'OT..';
                  }
                } else {
                  this.attendances[date].status = 'OT LEAVE';
                  // this.calculateAttendanceBonus();
                }
              } else {
                this.attendances[date].status = 'OT LEAVE';
                // this.calculateAttendanceBonus();
              }
            } else if (weekEnd ) {
              this.attendances[date].status = 'WEEK END';
            } else if (holiday.length !== 0 ) {
              this.attendances[date].status = 'HOLIDAY';
            }


            this.attendanceBody.push(this.attendances[date]);
          }

          this.calculateSalary();
        },
        err => {
        }
      );
    } else {
      this.attendanceBody = [];
      this.leave = 0;
      this.lateTime = 0;
      this.otTime = 0;
    }
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  };

  // calculate attendance bonus
  calculateAttendanceBonus() {
    if (this.leave >= 2) {
      return 0;
    } else if (this.leave >= 1) {
      return 1000;
    } else {
      return 2000;
    }
  }


  // calculate Salary
  calculateSalary(): void {
    this.businessDays = this.calcBusinessDays(this.startDate, this.endDate);
    this.basicSalary = this.selectedEmployee.salary;
    this.overTime = (this.basicSalary / (200 * 60 )) * (this.otTime / (1000 * 60)) * 1.5 || 0;
    this.leavePenalty = (this.basicSalary / this.workingDays) * this.calculatedLeave();
    this.latePenalty = (this.basicSalary / (this.workingDays * 9 * 60 )) * (this.lateTime / (1000 * 60));
    this.attendanceBonus = this.calculateAttendanceBonus();
  }

  calcBusinessDays(startD: any, endD: any) {
    // This makes no effort to account for holidays
    // Counts end day, does not count start day

    // make copies we can normalize without changing passed in objects
    const start = new Date(startD);
    const end = new Date(endD);

    // initial total
    let totalBusinessDays = 0;

    // normalize both start and end to beginning of the day
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const current = new Date(start);
    current.setDate(current.getDate() + 1);
    let day;
    // loop through each day, checking
    while (current < end) {
      day = current.getDay();
      if (day >= 1 && day <= 5) {
        ++totalBusinessDays;
      }
      current.setDate(current.getDate() + 1);
    }
    return totalBusinessDays - this.holidays.length;
  }

  isHoliday(checkedDate: any) {
    let isHoliday = false;
    for (let i = 0; i < this.holidays.length; i++) {
      if (checkedDate.setHours(0, 0, 0, 0) === new Date(this.holidays[i].date).setHours(0, 0, 0, 0)) {
        isHoliday = true;
      }
    }

    return isHoliday;
  }

  /*get Ot Time*/
  getOtTime(time: any): string {
    return (Math.floor(parseInt(time, 10) / (1000 * 60 * 60)) || 0) + '.' + (Math.floor(parseInt(time, 10) / (1000 * 60) % 60) || 0);
  }

  getTimeDifference(milisecondsDiff: any) {
    return Math.floor(milisecondsDiff / (1000 * 60 * 60)).toLocaleString(undefined, {minimumIntegerDigits: 2}) +
      ':' + (Math.floor(milisecondsDiff / (1000 * 60)) % 60).toLocaleString(undefined, {minimumIntegerDigits: 2}) +
      ':' + (Math.floor(milisecondsDiff / 1000) % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
  }

  calculatedLeave(): any {
    return this.leave > 8 ? (this.workingDays - this.businessDays + this.leave)
      : this.leave > 5 ? (this.leave + 2)
        : this.leave > 2.5 ? (this.leave + 1)
          : this.leave;
  }

  /*print dialog*/
  openPrintDialog(): void {
    if (this.selectedEmployee) {
      const config = new MdDialogConfig();
      const dialogRef: MdDialogRef<SalarySlipDialogComponent> = this.dialog.open(SalarySlipDialogComponent, {width: '750px'});
      dialogRef.componentInstance.employee = this.selectedEmployee;
      dialogRef.componentInstance.basicSalary = this.basicSalary;
      dialogRef.componentInstance.otTime = this.getOtTime(this.otTime);
      dialogRef.componentInstance.overTime = this.overTime;
      dialogRef.componentInstance.leave = this.leave;
      dialogRef.componentInstance.leavePenalty = this.leavePenalty;
      dialogRef.componentInstance.incentive = this.incentive;
      dialogRef.componentInstance.attendanceBonus = this.attendanceBonus;
      dialogRef.componentInstance.lateTime = this.lateTime;
      dialogRef.componentInstance.latePenalty = this.latePenalty;
      dialogRef.componentInstance.startDate = this.startDate;
    }
  }
}

@Component({
  selector: 'app-salary-slip-dialog',
  styleUrls: ['./salary-slip-dialog.component.css'],
  template: `
    <div class="printable">

      <button md-icon-button class="print-btn" (click)="print()">
        <md-icon>print</md-icon>
      </button>
      <h2>Deez</h2>
      <h4>Salary Slip</h4>
      <div class="row">
        <span class="label">Year</span>
        <span class="val">{{startDate | date: 'yyyy'}}</span>
      </div>
      <div class="row">
        <span class="label">Month</span>
        <span class="val">{{startDate | date: 'MMMM'}}</span>
      </div>
      <div class="row">
        <span class="label">Emp No</span>
        <span class="val">{{employee.uid | slice:-4}}</span>
      </div>
      <div class="row">
        <span class="label">Name</span>
        <span class="val">{{employee.initials}} {{employee.firstName}} {{employee.lastName}}</span>
      </div>

      <table>
        <tr>
          <td>Basic Salary</td>
          <td></td>
          <td><b>{{basicSalary | number:'1.2-2'}}</b></td>
        </tr>
        <tr>
          <td>Leave ({{leave}} days)</td>
          <td>{{leavePenalty | number:'1.2-2'}}</td>
          <td></td>
        </tr>
        <tr>
          <td>Late ({{lateTime / (1000 * 60) | number:'1.2-2'}} min)</td>
          <td>{{latePenalty | number:'1.2-2'}}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td class="total">{{latePenalty + leavePenalty | number:'1.2-2'}}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td class="total">{{basicSalary - leavePenalty - latePenalty | number:'1.2-2'}}</td>
        </tr>
        <tr>
          <td>Over Time ({{otTime}} hrs)</td>
          <td>{{overTime | number:'1.2-2'}}</td>
          <td></td>
        </tr>
        <tr>
          <td>Incentive</td>
          <td>{{incentive | number:'1.2-2'}}</td>
          <td></td>
        </tr>
        <tr>
          <td>Attendance Bonus</td>
          <td>{{attendanceBonus | number:'1.2-2'}}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td class="total">{{attendanceBonus + incentive + overTime | number:'1.2-2'}}</td>
          <td></td>
        </tr>
        <tr>
          <td><b>Net Salary</b></td>
          <td></td>
          <td class="total">
            {{basicSalary - leavePenalty - latePenalty + overTime + attendanceBonus + incentive | number:'1.2-2'}}
          </td>
        </tr>
      </table>


      <div class="printOnly">
        <h2>Deez</h2>
        <h4>Salary Slip</h4>
        <div class="row">
          <span class="label">Year</span>
          <span class="val">{{startDate | date: 'yyyy'}}</span>
        </div>
        <div class="row">
          <span class="label">Month</span>
          <span class="val">{{startDate | date: 'MMMM'}}</span>
        </div>
        <div class="row">
          <span class="label">Emp No</span>
          <span class="val">{{employee.uid | slice:-4}}</span>
        </div>
        <div class="row">
          <span class="label">Name</span>
          <span class="val">{{employee.initials}} {{employee.firstName}} {{employee.lastName}}</span>
        </div>

        <table>
          <tr>
            <td>Basic Salary</td>
            <td></td>
            <td><b>{{basicSalary | number:'1.2-2'}}</b></td>
          </tr>
          <tr>
            <td>Leave ({{leave}} days)</td>
            <td>{{leavePenalty | number:'1.2-2'}}</td>
            <td></td>
          </tr>
          <tr>
            <td>Late ({{lateTime / (1000 * 60) | number:'1.2-2'}} min)</td>
            <td>{{latePenalty | number:'1.2-2'}}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="total">{{latePenalty + leavePenalty | number:'1.2-2'}}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td class="total">{{basicSalary - leavePenalty - latePenalty | number:'1.2-2'}}</td>
          </tr>
          <tr>
            <td>Over Time ({{otTime}} hrs)</td>
            <td>{{overTime | number:'1.2-2'}}</td>
            <td></td>
          </tr>
          <tr>
            <td>Incentive</td>
            <td>{{incentive | number:'1.2-2'}}</td>
            <td></td>
          </tr>
          <tr>
            <td>Attendance Bonus</td>
            <td>{{attendanceBonus | number:'1.2-2'}}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="total">{{attendanceBonus + incentive + overTime | number:'1.2-2'}}</td>
            <td></td>
          </tr>
          <tr>
            <td><b>Net Salary</b></td>
            <td></td>
            <td class="total">
              {{basicSalary - leavePenalty - latePenalty + overTime + attendanceBonus + incentive | number:'1.2-2'}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  `
})
export class SalarySlipDialogComponent {
  employee: Employee;
  basicSalary: number;
  otTime: any;
  overTime: number;
  leave: any;
  leavePenalty: number;
  lateTime: number;
  latePenalty: number;
  attendanceBonus: number;
  startDate: any;
  incentive: any;
  window: any;

  constructor(public dialogRef: MdDialogRef<SalarySlipDialogComponent>) {
    this.window = window;
  }

  print(): void {
    window.print();
  }

}
