import {Component, OnInit} from '@angular/core';
import {Cut} from '../../shared/sdk/models/Cut';
import {CutApi} from '../../shared/sdk/services/custom/Cut';
import {TitleService} from '../../services/title.service';
import {MdDialog, MdDialogConfig, MdDialogRef, MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-all-cutts',
  templateUrl: './all-cutts.component.html',
  styleUrls: ['./all-cutts.component.css']
})

export class AllCuttsComponent implements OnInit {

  public cuts: Cut[] = new Array<Cut>();
  public startDate: Date;
  public endDate: Date;

  constructor(public cutApi: CutApi,
              private titleService: TitleService,
              public dialog: MdDialog,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {


    const date = new Date();
    this.startDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    this.endDate = new Date(date.getFullYear(), date.getMonth() - 1, new Date(date.getFullYear()
      , date.getMonth(), 0).getDate());

    this.titleService.sendTitle('All Cuts');

    this.cutApi.find({
      order: 'date DESC',
      where: {
        date: {between: [this.startDate.setHours(0, 0, 0, 0), this.endDate.setHours(0, 0, 0, 0) + 1000 * 60 * 60 * 24]}
      }
    }).subscribe(
      (cuts: Cut[]) => this.cuts = cuts,
      err => {

        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection', 'DISMISS', {
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
        date: {between: [this.startDate.setHours(0, 0, 0, 0), this.endDate.setHours(0, 0, 0, 0) + 1000 * 60 * 60 * 24]}
      }
    }).subscribe(
      (cuts: Cut[]) => this.cuts = cuts,
      err => {

        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection', 'DISMISS', {
          duration: 5000,
        });
      }
    );
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
