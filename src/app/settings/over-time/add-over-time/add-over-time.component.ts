import { Component, OnInit } from '@angular/core';
import {OverTime} from '../../../shared/sdk/models/OverTime';
import {OverTimeApi} from '../../../shared/sdk/services/custom/OverTime';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-over-time',
  templateUrl: './add-over-time.component.html',
  styleUrls: ['./add-over-time.component.css']
})
export class AddOverTimeComponent implements OnInit {

  public overTime: OverTime = new OverTime();
  public  loading = false;
  public  minDate: Date;
  public  maxDate: Date;

  constructor(private overTimeApi: OverTimeApi,
              public snackBar: MdSnackBar,
              public router: Router) { }

  ngOnInit() {}

  addOverTime(): void {
    this.loading = true;
    this.overTimeApi.create(this.overTime).subscribe(
      (res: OverTime) => {
        this.overTime = new OverTime();
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

  // getMinDate
  changeOtDate(event: any) {
    this.minDate = new Date(event.value);
    this.maxDate = new Date(new Date(event.value).setDate(new Date(event.value).getDate() + 1));
  }

}
