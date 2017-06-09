import { Component, OnInit } from '@angular/core';
import {TitleService} from '../../services/title.service';
import {AppUserApi} from '../../shared/sdk/services/custom/AppUser';
import {SDKToken} from '../../shared/sdk/models/BaseModels';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {Router} from '@angular/router';
import {AppUser} from '../../shared/sdk/models/AppUser';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: AppUser = new AppUser();
  public loading = false;

  constructor(
    private userApi: AppUserApi,
    private authService: LoopBackAuth,
    private router: Router,
    private titleService: TitleService,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.titleService.sendTitle('Login');
  }


  login() {
    this.loading = true;
    this.userApi.login(this.user)
      .subscribe((token: SDKToken) => {
        this.authService.setUser(token);
        this.router.navigate(['/']);
        this.loading = false;
      }, (err: any) => {
        this.snackBar.open(err.message ? err.message : 'Login failed!', 'DISMISS', {
          duration: 5000,
        });
        this.user.password = '';
        this.loading = false;
      });
  }
}
