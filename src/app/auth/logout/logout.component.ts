import { Component, OnInit } from '@angular/core';
import {AppUserApi} from '../../shared/sdk/services/custom/AppUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userApi: AppUserApi,
    private router: Router) { }

  ngOnInit() {

    this.userApi.logout();
    this.router.navigate(['/auth/login']);
  }

}
