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
  public attendanceHeader: any = ['DATE', 'IN', 'OUT', 'STATUS'];
  public attendanceBody: any = [];
  public attendances: Attendance[] = Array<Attendance>();
  public attendance: Attendance;

  public holidays: Array<Holiday>;
  public overTimes: Array<OverTime>;

  public startDate: any;
  public endDate: any;

  public showFilter = false;
  public leave: any;
  public lateTime: any;
  public otTime: any;
  public incentive: any = 0;

  public basicSalary: any;
  public overTime: any;
  public leavePenalty: any;
  public latePenalty: any;
  public attendanceBonus: any;

  constructor(private titleService: TitleService, private employeeApi: EmployeeApi,
              private attendanceApi: AttendanceApi, private holidayApi: HolidayApi, private overTimeApi: OverTimeApi,
              public dialog: MdDialog,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {

    const date = new Date();
    this.startDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    this.endDate = new Date(date.getFullYear(), date.getMonth() - 1, new Date(date.getFullYear()
      , date.getMonth(), 0).getDate());

    this.titleService.sendTitle('View Attendance');

    this.employeeApi.find().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      }
    );
    this.changeDate();
  }

  updateTime(row: any): void {
    let newAttendance;
    if (row.inTimeEdit) {
      newAttendance = row.inTime;
    } else {
      newAttendance = row.outTime;
    }
    // this.attendance = new Attendance();
    // this.attendance.name = this.attendances[0].name;
    // this.attendance.uid = this.attendances[0].uid;
    // this.attendance.employeeId = this.attendances[0].uid;
    // this.attendance.dateTime = new Date(newAttendance);

    this.attendanceApi.patchOrCreate(newAttendance).subscribe(
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

  changeDate(): void {

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
      },
      err => {
        console.log(err);
      }
    );

    // get OverTimes
    this.overTimeApi.find().subscribe(
      (res: OverTime[]) => {
        this.overTimes = res;
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
          this.attendances = attendances;
          this.attendanceBody = [];
          this.leave = 0;
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
            const date = <Date> JSON.parse(JSON.stringify(i));
            let inTime;
            let outTime;
            if (times.length > 0) {
                inTime = times[0];
                outTime = times.length > 1 ? times[times.length - 1] : new Attendance();
                row = {date: date, inTime: inTime, outTime: outTime};

              if (!(strtDate.getDay() === 6 || strtDate.getDay() === 0)) {

                if (new Date(inTime.dateTime).getTime() > new Date(strtDate.setHours(13, 0, 0, 0)).getTime()) {
                  row.status = 'LEAVE';
                  this.leave++;
                  outTime = null;
                } else if (new Date(inTime.dateTime).getTime() > new Date(strtDate.setHours(12, 0, 0, 0)).getTime()) {
                  this.leave += .5;
                  row.status = 'HALF DAY MO..';
                } else if (new Date(inTime.dateTime).getTime() > new Date(strtDate.setHours(8, 0, 0, 0)).getTime()) {
                  this.lateTime += new Date(inTime.dateTime).getTime() - strtDate.getTime();
                }

                if (outTime) {
                  if (new Date(outTime.dateTime).getTime() < new Date(strtDate.setHours(13, 0, 0, 0)).getTime()) {
                    row.status = 'LEAVE';
                    this.leave++;
                  } else if (new Date(outTime.dateTime).getTime() < new Date(strtDate.setHours(14, 0, 0, 0)).getTime()) {
                    this.leave += .5;
                    row.status = 'HALF DAY EV..';
                  } else if (new Date(outTime.dateTime).getTime() < new Date(strtDate.setHours(18, 0, 0, 0)).getTime()) {
                    this.lateTime += strtDate.getTime() - new Date(outTime.dateTime).getTime();
                  }
                }
              }

              // calculate Ovet Time
              for (let j = 0; j < this.overTimes.length; ++j) {
                if (new Date(this.overTimes[j].date).setHours(0, 0, 0, 0) === new Date(strtDate).setHours(0, 0, 0, 0)) {

                  const startTime = new Date(this.overTimes[j].startTime).getTime();
                  const endTime = new Date(this.overTimes[j].endTime).getTime();

                  const inT = new Date(inTime.dateTime).getTime();
                  const outT = new Date(outTime.dateTime).getTime();

                  if (startTime > inT && endTime < outT) {
                    this.otTime += endTime - startTime;
                  } else if (startTime > inT && endTime > outT) {
                    this.otTime += outT - startTime;
                  } else if (startTime < inT && endTime < outT) {
                    this.otTime += endTime - inT;
                  } else {
                    this.otTime += outT - inT;
                  }
                  console.log('overTime Matched');

                }
              }

            } else {

              if (strtDate.getDay() === 6 || strtDate.getDay() === 0) {
                row = {date: date, inTime: new Attendance(), outTime: new Attendance(), status: 'HOLIDAY'};
              } else if (this.isHoliday(strtDate)) {
                row = {date: date, inTime: new Attendance(), outTime: new Attendance(), status: 'HOLIDAY'};
              } else {
                row = {date: date, inTime: new Attendance(), outTime: new Attendance(), status: 'LEAVE'};
                this.leave++;
              }
            }

            this.attendanceBody.push(row);

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

  calculateSalary(): void {
    const businessDays = this.calcBusinessDays(this.startDate, this.endDate);
    this.basicSalary = this.selectedEmployee.salary;
    this.overTime = (this.basicSalary / (200 * 60 )) * (this.otTime / (1000 * 60)) * 1.5 || 0;
    this.leavePenalty = (this.basicSalary / 26) * this.leave;
    this.latePenalty = (this.basicSalary / (26 * 9 * 60 )) * (this.lateTime / (1000 * 60));
    this.attendanceBonus = this.leave === 0 ? 2000 : this.leave < 1.5 ? 1000 : 0;
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
    while (current <= end) {
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
        <span class="val">{{employee.uid}}</span>
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
          <td>Late ({{lateTime / (1000 * 60)}} min)</td>
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

  constructor(public dialogRef: MdDialogRef<SalarySlipDialogComponent>) {
  }
}
