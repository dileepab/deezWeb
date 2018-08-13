import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pattern} from '../../shared/sdk/models/Pattern';
import {TitleService} from '../../services/title.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {PatternApi} from '../../shared/sdk/services/custom/Pattern';

@Component({
  selector: 'app-view-pattern',
  templateUrl: './view-pattern.component.html',
  styleUrls: ['./view-pattern.component.css']
})
export class ViewPatternComponent implements OnInit, OnDestroy {

  id: any;

  public sub: any;

  public pattern: Pattern = new Pattern();
  public selectedFile: any;
  public imageSrc = '';
  public imgLoaded = false;

  formDisabled = true;
  loading = false;

  constructor(private patternApi: PatternApi,
              private titleService: TitleService,
              private router: Router,
              private route: ActivatedRoute,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {

    this.titleService.sendTitle('View Pattern');

    this.sub = this.route.params.subscribe((params: any) => {
      this.id = params['id'];
    });
    this.patternApi.findById(this.id).subscribe(
      (pattern: Pattern) => {
        if (!pattern.operations) {
          pattern.operations = new Pattern();
        }
        this.pattern = pattern;
      },
      err => {
        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection',
          (err.statusCode === 401 ? this.router.navigate(['/auth/logout']) : false) && 'DISMISS', <MdSnackBarConfig>{
            duration: 5000
          });
      }
    );

  }

  changeListener($event: any): void {
    this.readFile($event.target);
  }

  readFile(inputValue: any): void {
    if (!inputValue.files[0]) {
      return;
    }
    this.selectedFile = inputValue.files[0];

    const reader = new FileReader(),
      file: File = inputValue.files[0];


    reader.readAsDataURL(file);
    reader.onload = (e: Event) => {
      this.onLoadCallback(e);
    };
  }

  onLoadCallback(e: any) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.imgLoaded = true;
  }

  patNoChange() {
    this.patternApi.count({and: [{name: this.pattern.name}]}).subscribe(
      res => {
        if (res.count > 0) {
          this.snackBar.open('Pattern No. already exist. Please chose different No.', 'DISMISS', <MdSnackBarConfig>{
            duration: 5000
          });
          this.pattern.name = '';
        }
      },
      err => {
        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection',
          (err.statusCode === 401 ? this.router.navigate(['/auth/logout']) : false) && 'DISMISS', <MdSnackBarConfig>{
            duration: 5000
          });
      }
    );
  }

  cancelEdit(): void {
    this.formDisabled = true;
  }

  updatePattern(): void {
    this.loading = true;
    this.patternApi.patchOrCreate(this.pattern).subscribe(
      (pattern: Pattern) => {
        this.loading = false;
        this.cancelEdit();
        this.snackBar.open('Successfully Updated', 'DISMISS', <MdSnackBarConfig>{
          duration: 5000,
        });
      },
      err => {
        this.snackBar.open(err.message ? err.message : 'Error Occurred. Check Your Internet Connection', 'DISMISS', <MdSnackBarConfig>{
          duration: 5000,
        });
      }
    );

  }

  addNewRow(): void {
    this.pattern.operations.push({code: 'op1', descEn: '', descSi: '', target: ''});
  }

  removeRow(idx: any): void {
    this.pattern.operations.splice(idx, 1);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
