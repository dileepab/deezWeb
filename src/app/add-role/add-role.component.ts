import {Component, OnInit} from '@angular/core';
import {Role, RoleApi} from '../shared/sdk';
import {TitleService} from '../services/title.service';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  public role: Role = new Role();
  public roles: Role[] = new Array<Role>();

  loading = false;

  constructor(public roleApi: RoleApi,
              private titleService: TitleService,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.titleService.sendTitle('Add Role');
    this.roleApi.find().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      }
    );
  }

  addRole() {
    this.loading = true;
    this.roleApi.create(this.role).subscribe(
      (role: Role) => {
        this.loading = false;
        this.roles.push(role);
      },
      err => {
        this.snackBar.open(err.message ? err.message : 'Error Occurred. Check Your Internet Connection', 'DISMISS', {
          duration: 5000,
        });
        this.loading = false;
      }
    );
  }

}
