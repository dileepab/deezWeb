import { Component, OnInit } from '@angular/core';
import {PatternApi} from '../../shared/sdk/services/custom/Pattern';
import {TitleService} from '../../services/title.service';
import {MdDialog, MdSnackBar} from '@angular/material';
import {Pattern} from '../../shared/sdk/models/Pattern';

@Component({
  selector: 'app-all-pattern',
  templateUrl: './all-pattern.component.html',
  styleUrls: ['./all-pattern.component.css']
})
export class AllPatternComponent implements OnInit {

  public patterns: Pattern[] = new Array<Pattern>();

  constructor(public patternApi: PatternApi,
              private titleService: TitleService,
              public dialog: MdDialog,
              public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.titleService.sendTitle('All Patterns');

    this.patternApi.find({
      order: 'date DESC',
    }).subscribe(
      (patterns: Pattern[]) => this.patterns = patterns,
      err => {

        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection', 'DISMISS', {
          duration: 5000,
        });
      }
    );
  }

}
