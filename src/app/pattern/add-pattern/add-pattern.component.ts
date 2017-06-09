import {Component, OnInit} from '@angular/core';
import {PatternApi} from '../../shared/sdk/services/custom/Pattern';
import {TitleService} from '../../services/title.service';
import {MdSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Pattern} from '../../shared/sdk/models/Pattern';
import {ContainerApi} from '../../shared/sdk/services/custom/Container';
import {RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'app-add-pattern',
  templateUrl: './add-pattern.component.html',
  styleUrls: ['./add-pattern.component.css']
})
export class AddPatternComponent implements OnInit {

  public pattern: Pattern = new Pattern();
  public selectedFile: any;

  loading = false;

  constructor(public patternApi: PatternApi,
              private titleService: TitleService,
              public snackBar: MdSnackBar,
              public router: Router,
              public containerApi: ContainerApi
  ) {
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

    const formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({ headers: headers });

    this.containerApi.upload({container: 'test'}, {file: file}).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
    // reader.readAsDataURL(file);
    // reader.onload = (e: Event) => {
    //   // this.onLoadCallback(e);
    // };
  }

  addPattern() {

    this.loading = true;
    this.patternApi.patchOrCreate(this.pattern).subscribe(
      (pattern: Pattern) => {
        this.loading = false;
        this.pattern = new Pattern();
        this.pattern.operations = [];
        this.pattern.operations.push({code: 'op1', descEn: '', descSi: '', target: ''});
        this.snackBar.open('Successfully Added', 'DISMISS', {
          duration: 5000,
        });
      },
      (err: any) => {

        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection',
          (err.statusCode === 401 ? this.router.navigate(['/auth/logout']) : false) && 'DISMISS', {
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
