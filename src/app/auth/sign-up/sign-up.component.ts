import { Component, OnInit } from '@angular/core';
import {TitleService} from '../../services/title.service';
import {Router} from '@angular/router';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {AppUserApi} from '../../shared/sdk/services/custom/AppUser';
import {AppUser} from '../../shared/sdk/models/AppUser';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signUpUser: AppUser = new AppUser();
  public passwordConfirm: any;
  public loading = false;

  constructor(
    private userApi: AppUserApi,
    private authService: LoopBackAuth,
    private router: Router,
    private titleService: TitleService,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.titleService.sendTitle('Sign UP');
  }

  sign4up() {
    if (this.signUpUser.password !== this.passwordConfirm) {
      this.snackBar.open('Passwords must match!', '', {
        duration: 5000,
      });
    }

    this.signUpUser.userRole = 'demo';

    this.loading = true;
    this.userApi.create(this.signUpUser).subscribe((res: any) => {
        this.snackBar.open(res.content, '', {
          duration: 5000,
        });
        this.signUpUser = new AppUser();
        this.passwordConfirm = '';
      this.loading = false;
    },
      (err: any) => {
        this.snackBar.open(err.message, 'DISMISS', {
          duration: 5000,
        });
        this.loading = false;
      });
  }

}
