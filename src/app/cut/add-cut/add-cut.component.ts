import {Component, OnInit} from '@angular/core';
import {CutApi} from '../../shared/sdk/services/custom/Cut';
import {TitleService} from '../../services/title.service';
import {Cut} from '../../shared/sdk/models/Cut';
import {OtherMaterial} from '../../shared/otherMaterial';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-cut',
  templateUrl: './add-cut.component.html',
  styleUrls: ['./add-cut.component.css']
})
export class AddCutComponent implements OnInit {

  public cut: Cut = new Cut();
  public today = new Date();
  public minDate = new Date(new Date().setMonth(new Date().getMonth() - 2));
  customers = [
    {
      name: 'Pettah',
      id: 0
    },
    {
      name: 'Nolimit',
      id: 1
    },
    {
      name: 'Thilakawardane',
      id: 2
    },
    {
      name: 'Other',
      id: 3
    }
  ];

  loading = false;


  constructor(public cutApi: CutApi,
              private titleService: TitleService,
              public snackBar: MdSnackBar,
              public router: Router) {
  }

  ngOnInit() {
    this.titleService.sendTitle('Add Cut');

    this.cut.otherMaterials = [];
    this.cut.otherMaterials.push(new OtherMaterial());
  }

  addCut() {

    this.loading = true;
    this.cut.date = this.cut.date || new Date();
    this.cutApi.patchOrCreate(this.cut).subscribe(
      (cut: Cut) => {
        this.loading = false;
        this.cut = new Cut();
        this.cut.otherMaterials = [];
        this.cut.otherMaterials.push(new OtherMaterial());
        this.snackBar.open('Successfully Added', 'DISMISS', <MdSnackBarConfig>{
          duration: 5000,
        });
      },
      err => {

        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection',
          (err.statusCode === 401 ? this.router.navigate(['/auth/logout']) : false) && 'DISMISS', <MdSnackBarConfig>{
            duration: 5000
          });
        this.loading = false;
      }
    );
  }

  addNewRow(): void {
    this.cut.otherMaterials.push(new OtherMaterial());
  }

  removeRow(idx: any): void {
    this.cut.otherMaterials.splice(idx, 1);
  }

  otherCost(): any {
    if (!this.cut) {
      return false;
    }

    let otherCost: any = 0;
    for (const entry of  this.cut.otherMaterials) {
      otherCost += parseFloat(entry.price || 0);
    }
    return otherCost;
  }
}
