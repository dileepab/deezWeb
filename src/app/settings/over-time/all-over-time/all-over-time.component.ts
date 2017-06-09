import { Component, OnInit } from '@angular/core';
import {OverTimeApi} from '../../../shared/sdk/services/custom/OverTime';
import {OverTime} from '../../../shared/sdk/models/OverTime';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-all-over-time',
  templateUrl: './all-over-time.component.html',
  styleUrls: ['./all-over-time.component.css']
})
export class AllOverTimeComponent implements OnInit {

  public overTimes: Array<OverTime> = [];

  constructor(private overTimeApi: OverTimeApi,
              public snackBar: MdSnackBar,
              public router: Router) { }

  ngOnInit() {
    this.overTimeApi.find().subscribe(
      (res: OverTime[]) => {
        this.overTimes = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  removeOverTime(ot: OverTime, idx: any): void {
    this.overTimeApi.deleteById(ot.id).subscribe(
      (res) => {
        this.overTimes.splice(idx, 1);
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
