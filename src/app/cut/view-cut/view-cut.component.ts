import {Component, OnInit, OnDestroy} from '@angular/core';
import {Cut} from '../../shared/sdk/models/Cut';
import {CutApi} from '../../shared/sdk/services';
import {TitleService} from '../../services/title.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OtherMaterial} from '../../shared/otherMaterial';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-view-cut',
  templateUrl: './view-cut.component.html',
  styleUrls: ['./view-cut.component.css']
})
export class ViewCutComponent implements OnInit, OnDestroy {

  id: any;

  public sub: any;

  public cut: Cut = new Cut();

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

  formDisabled = true;
  loading = false;

  constructor(private cutApi: CutApi,
              private titleService: TitleService,
              private router: Router,
              private route: ActivatedRoute,
              public snackBar: MdSnackBar) {

  }

  ngOnInit() {

    this.titleService.sendTitle('View Cut');

    this.sub = this.route.params.subscribe((params: any) => {
      this.id = params['id'];
    });

    this.cutApi.findById(this.id).subscribe(
      (cut: Cut) => {
        if (!cut.otherMaterials) {
          cut.otherMaterials = new Cut();
        }
        this.cut = cut;
      },
      err => {
        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection',
          (err.statusCode === 401 ? this.router.navigate(['/auth/logout']) : false) && 'DISMISS', {
          duration: 5000
        });
      }
    );

  }

  editCut(): void {
    this.formDisabled = false;
  }

  cancelEdit(): void {
    this.formDisabled = true;
  }

  updateCut(): void {
    this.loading = true;
    this.cutApi.patchOrCreate(this.cut).subscribe(
      (cut: Cut) => {
        this.loading = false;
        this.cancelEdit();
        this.snackBar.open('Successfully Updated', 'DISMISS', {
          duration: 5000,
        });
      },
      err => {
        this.snackBar.open(err.message ? err.message : 'Error Occurred. Check Your Internet Connection', 'DISMISS', {
          duration: 5000,
        });
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
    if (!this.cut.otherMaterials) {
      return false;
    }
    let otherCost: any = 0;
    for (const entry of  this.cut.otherMaterials) {
      otherCost += parseFloat(entry.price || 0);
    }
    return otherCost;
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
