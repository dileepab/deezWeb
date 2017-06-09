import {Component, OnInit} from '@angular/core';
import {AppUser} from '../../shared/sdk/models/AppUser';
import {AppUserApi} from '../../shared/sdk/services/custom/AppUser';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {TitleService} from '../../services/title.service';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public user: AppUser = new AppUser();
  public loading = false;

  constructor(private userApi: AppUserApi,
              private authService: LoopBackAuth,
              private router: Router,
              private titleService: TitleService,
              public snackBar: MdSnackBar,
              public http: Http) {
  }

  ngOnInit() {
    this.titleService.sendTitle('Reset Password');
  }


  reset() {
    this.loading = true;
    this.userApi.resetPassword(this.user)
      .subscribe((res: any) => {
        this.snackBar.open('Please check your email and click on the Password reset link.', 'DISMISS', {
          duration: 5000,
        });
        this.user.email = '';
        this.loading = false;
      }, (err: any) => {
        this.snackBar.open(err.message ? err.message : 'Login failed!', 'DISMISS', {
          duration: 5000,
        });
        this.loading = false;
      });
  }

}
