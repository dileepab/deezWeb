import {Component, OnInit} from '@angular/core';
import {PatternApi} from '../../shared/sdk/services/custom/Pattern';
import {TitleService} from '../../services/title.service';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {Router} from '@angular/router';
import {Pattern} from '../../shared/sdk/models/Pattern';
import {RequestOptions, Headers, Http} from '@angular/http';
import {LoopBackConfig} from '../../shared/sdk/lb.config';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-add-pattern',
  templateUrl: './add-pattern.component.html',
  styleUrls: ['./add-pattern.component.css']
})
export class AddPatternComponent implements OnInit {

  public pattern: Pattern = new Pattern();
  public selectedFile: any;

  public imageSrc = '';

  loading = false;

  public imgLoaded = false;

  constructor(public patternApi: PatternApi,
              private titleService: TitleService,
              public snackBar: MdSnackBar,
              public router: Router,
              private _http: Http) {
  }

  ngOnInit() {

    this.titleService.sendTitle('Add Pattern');

    this.pattern.operations = [];
    this.pattern.operations.push({code: 'op1', descEn: '', descSi: '', target: ''});
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

  addPattern() {

    this.loading = true;

    const reader = new FileReader(),
      file: File = this.selectedFile;

    const formData: FormData = new FormData();
    const fileExtension = file.name.split('.').pop();
    formData.append('uploadFile', file, 'Pat-' + this.pattern.name + '.JPEG');
    const headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    const options = new RequestOptions({headers: headers});


    // this.containerApi.upload()
    this._http.post(
      LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion() + '/containers/test/upload', formData, options
    ).subscribe(
      (res: any) => {
        this.selectedFile = null;
        this.imgLoaded = false;
        // this.pattern.imgLink = res.webViewLink;
        console.log(JSON.parse(res._body).id);

        const resBody = JSON.parse(res._body);
        this.pattern.imgId = resBody.id;
        this.pattern.imgLink = resBody.webContentLink;
        this.pattern.thumbnailLink = resBody.thumbnailLink.split('=')[0] + '=s40';


        this.patternApi.patchOrCreate(this.pattern).subscribe(
          (pattern: Pattern) => {
            this.pattern = new Pattern();
            this.pattern.operations = [];
            this.pattern.operations.push({code: 'op1', descEn: '', descSi: '', target: ''});
            this.snackBar.open('Successfully Added', 'DISMISS', <MdSnackBarConfig>{
              duration: 5000,
            });
            this.loading = false;

          },
          (err: any) => {

            this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection',
              (err.statusCode === 401 ? this.router.navigate(['/auth/logout']) : false) && 'DISMISS', <MdSnackBarConfig>{
                duration: 5000
              });
            this.loading = false;
          }
        );
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
    const temp = [];
    for (let i = 0; i < this.pattern.operations.length; i++) {
      temp.push({... this.pattern.operations[i]});
    }

    temp.push({
      code: 'op' + (temp.length + 1),
      descEn: '',
      descSi: '',
      target: ''
    });

    this.pattern.operations = temp;
  }

  removeRow(idx: any): void {
    this.pattern.operations.splice(idx, 1);
    for (let i = 0; i < this.pattern.operations.length; i++) {
      this.pattern.operations[i].code = 'op' + (i + 1);
    }
  }

}
