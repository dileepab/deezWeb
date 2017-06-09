import {Component, OnInit} from '@angular/core';
import {Holiday} from '../../../shared/sdk/models/Holiday';
import {HolidayApi} from '../../../shared/sdk/services/custom/Holiday';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.css']
})
export class AddHolidayComponent implements OnInit {

  public holiday: Holiday = new Holiday();
  public loading = false;

  constructor(private holidayApi: HolidayApi,
              public snackBar: MdSnackBar,
              public router: Router) {
  }

  ngOnInit() {
  }

  addHoliday(): void {
    this.loading = true;
    this.holidayApi.create(this.holiday).subscribe(
      (res: Holiday) => {
        this.holiday = new Holiday();
        this.loading = false;
        this.snackBar.open('Successfully Added', 'DISMISS', {
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
