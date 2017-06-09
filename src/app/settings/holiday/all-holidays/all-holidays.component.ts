import {Component, OnInit} from '@angular/core';
import {Holiday} from '../../../shared/sdk/models/Holiday';
import {HolidayApi} from '../../../shared/sdk/services/custom/Holiday';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-all-holidays',
  templateUrl: './all-holidays.component.html',
  styleUrls: ['./all-holidays.component.css']
})
export class AllHolidaysComponent implements OnInit {

  public holidays: Array<Holiday> = [];

  constructor(private holidayApi: HolidayApi,
              public snackBar: MdSnackBar,
              public router: Router) {
  }

  ngOnInit() {
    this.holidayApi.find().subscribe(
      (res: Holiday[]) => {
        this.holidays = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  removeHoliday(holiday: Holiday, idx: any): void {
    this.holidayApi.deleteById(holiday.id).subscribe(
      (res) => {
        this.holidays.splice(idx, 1);
        this.snackBar.open('Successfully Removed', 'DISMISS', {
          duration: 5000,
        });
      },
      (err: any) => {
        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection',
          (err.statusCode === 401 ? this.router.navigate(['/auth/logout']) : false) && 'DISMISS', {
            duration: 5000
          });
      }
    );
  }

}
