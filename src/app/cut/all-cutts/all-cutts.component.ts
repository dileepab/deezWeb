import {Component, Inject, OnInit} from '@angular/core';
import {Cut} from '../../shared/sdk/models/Cut';
import {CutApi} from '../../shared/sdk/services/custom/Cut';
import {TitleService} from '../../services/title.service';
import {MdDialog, MdDialogConfig, MdDialogRef, MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';

@Component({
  selector: 'app-all-cutts',
  templateUrl: './all-cutts.component.html',
  styleUrls: ['./all-cutts.component.css']
})

export class AllCuttsComponent implements OnInit {

  public cuts: Cut[] = new Array<Cut>();
  public startDate: Date;
  public endDate: Date;
  public token: any;
  public userRole: any;

  constructor(public cutApi: CutApi,
              private titleService: TitleService,
              public dialog: MdDialog,
              public authService: LoopBackAuth,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {

    this.token = this.authService.getToken();
    this.userRole = this.token.user.user.userRole;

    const date = new Date();
    this.startDate = new Date(2017, 0, 1);
    this.endDate = new Date();

    this.titleService.sendTitle('All Cuts');

    this.cutApi.find({
      order: 'date DESC',
      where: {
        date: {between: [this.startDate.setHours(0, 0, 0, 0), this.endDate.setHours(0, 0, 0, 0) + 1000 * 60 * 60 * 24]}
      }
    }).subscribe(
      (cuts: any) => this.cuts = cuts,
      err => {

        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection', 'DISMISS', <MdSnackBarConfig>{
          duration: 5000,
        });
      }
    );
  }

  /*changeDate*/
  changeDate(): void {
    this.cutApi.find({
      order: 'date DESC',
      where: {
        deliverDate: {between: [this.startDate.setHours(0, 0, 0, 0), this.endDate.setHours(0, 0, 0, 0) + 1000 * 60 * 60 * 24]}
      }
    }).subscribe(
      (cuts: any) => this.cuts = cuts,
      err => {

        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection', 'DISMISS', <MdSnackBarConfig>{
          duration: 5000,
        });
      }
    );
  }

  deleteCut(event: any, cut: any): void {
    event.stopPropagation();
    const config = new MdDialogConfig();
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cutApi.deleteById(cut.id).subscribe(
          (res: any) => {
            this.snackBar.open('Successfully deleted', 'DISMISS', <MdSnackBarConfig>{
              duration: 5000,
            });

            const index = this.cuts.indexOf(cut);
            this.cuts.splice(index, 1);

          },
          (err: any) => {
            this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection', 'DISMISS', <MdSnackBarConfig>{
              duration: 5000,
            });
          }
        );
      }
    });
  }

  /*print dialog*/
  openPrintDialog(): void {
    const config = new MdDialogConfig();
    const dialogRef: MdDialogRef<RevenueDialogComponent> = this.dialog.open(RevenueDialogComponent);

    dialogRef.componentInstance.cuts = this.cuts;
  }
}

@Component({
  selector: 'app-salary-slip-dialog',
  styleUrls: ['./all-cutts.component.css'],
  template: `
    <div class="printable">
      <h2>Expenses & Income Total</h2>
      <div class="row">
        <span class="label">Yard Prices</span>
        <span class="val">{{yardPrices | number:'1.2-2'}}</span>
      </div>
      <div class="row">
        <span class="label">Other Costs</span>
        <span class="val">{{otherCosts | number:'1.2-2'}}</span>
      </div>
      <div class="row">
        <span class="label">Income (Total Selling)</span>
        <span class="val">{{totalIncome | number:'1.2-2'}}</span>
      </div>
      <div class="row">
        <span class="label">Revenue</span>
        <span class="val total">{{totalRevenue | number:'1.2-2'}}</span>
      </div>
    </div>
  `
})

export class RevenueDialogComponent implements OnInit {

  public cuts: Cut[] = [];
  public yardPrices = 0;
  public otherCosts = 0;
  public totalIncome = 0;
  public totalRevenue = 0;

  constructor(public dialogRef: MdDialogRef<RevenueDialogComponent>) {
  }

  ngOnInit() {
    for (let i = 0; i < this.cuts.length; ++i) {
      this.yardPrices += (this.cuts[i].yardPrice * this.cuts[i].noOfYards) || 0;
      this.otherCosts += parseFloat(this.otherCost(this.cuts[i]) || 0);
      this.totalIncome += (this.cuts[i].noOfPieces * this.cuts[i].piecePrice || 0);
    }
    this.totalRevenue = (this.totalIncome - (this.yardPrices + this.otherCosts) || 0);
  }

  otherCost(cut: Cut): any {
    if (!cut.otherMaterials) {
      return false;
    }
    let otherCost: any = 0;
    for (const entry of  cut.otherMaterials) {
      otherCost += parseFloat(entry.price || 0);
    }
    return otherCost;
  }
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 md-dialog-title>Delete</h2>
    <md-dialog-content>Are you sure?</md-dialog-content>
    <md-dialog-actions>
      <button md-button md-dialog-close>No</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button md-button [md-dialog-close]="true">Yes</button>
    </md-dialog-actions>`,
})

export class ConfirmDialogComponent {
  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) { }
}
