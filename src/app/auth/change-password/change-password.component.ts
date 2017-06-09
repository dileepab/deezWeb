import {Component, OnInit} from '@angular/core';
import {AppUser} from '../../shared/sdk/models/AppUser';
import {AppUserApi} from '../../shared/sdk/services/custom/AppUser';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TitleService} from '../../services/title.service';
import {MdSnackBar} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {LoopBackConfig} from '../../shared/sdk/lb.config';
import {Http, Headers, Response, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public user: AppUser = new AppUser();
  public passwordConfirm: any;
  public loading = false;
  public sub: any;
  public access_token: any;

  constructor(
              private titleService: TitleService,
              private router: Router,
              private route: ActivatedRoute,
              private http: Http,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.titleService.sendTitle('Change Password');

    this.sub = this.route.params.subscribe((params: any) => {
      this.access_token = params['access_token'];
    });
  }

  changePassword() {
    if (this.user.password !== this.passwordConfirm) {
      this.snackBar.open('Passwords must match!', '', {
        duration: 5000,
      });
    }

    this.loading = true;
    // this.setPassword(this.user.password, {'access_token': this.access_token}).subscribe((res: any) => {
    this.setPassword(this.user.password).subscribe((res: any) => {
        this.snackBar.open(res.content, 'DISMISS', {
          duration: 5000,
        });
        this.router.navigate(['/auth']);
        this.passwordConfirm = '';
      },
      (err: any) => {
        this.snackBar.open(err, 'DISMISS', {
          duration: 5000,
        });
        this.loading = false;
      });
  }

  setPassword(password: any): Observable<Response> {
    const body = new URLSearchParams();
      body.set('password', password);
      body.set('confirmation', password);

    const headers = new Headers();
    headers.append('Content-Type',
      'application/x-www-form-urlencoded');
    return this.http.post(LoopBackConfig.getPath() + '/reset-password?access_token=' + this.access_token, body.toString(), {
      headers : headers
    }).map(res => res.json());
  }
}
