import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {TitleService} from '../../services/title.service';
import {Attendance} from '../../shared/sdk/models/Attendance';
import {AttendanceApi} from '../../shared/sdk/services/custom/Attendance';
import {MdSnackBar} from '@angular/material';
import {Router} from '@angular/router';
@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent implements OnInit {


  public localCsvHeader: any = '';
  public localCsv: any = '';
  public selectedFile: File;
  public attendance: Attendance;
  public attendances: Attendance[] = Array<Attendance>();

  public loading = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private titleService: TitleService,
              private attendanceApi: AttendanceApi,
              public snackBar: MdSnackBar,
              public router: Router
  ) {
  }

  ngOnInit() {
    this.titleService.sendTitle('Add Attendance');
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
    reader.readAsText(file);
    reader.onload = (e: Event) => {
      this.onLoadCallback(e);
    };
  }

  onLoadCallback(event: any): void {
    const csvData = event.target['result'] || '';
    const allTextLines = csvData.split(/\r\n|\n/);
    const headers = allTextLines[0].split('\t');
    const lines = [];

    for (let i = 1; i < allTextLines.length; i++) {
      // split content based on comma
      const data = allTextLines[i].split('\t');
      if (data.length === headers.length) {
        if (parseInt(data[2], 10) !== 0) {
          this.attendance = new Attendance();
          const tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          lines.push(tarr);
          this.attendance.name = data[3];
          this.attendance.uid = data[2];
          this.attendance.employeeId = data[2];
          this.attendance.dateTime = new Date(data[8]);
          this.attendances.push(this.attendance);
        }
      }
    }
    this.localCsvHeader = headers;
    this.localCsv = lines;
  }

  addAttendance(): void {
    this.attendanceApi.createMany(this.attendances).subscribe(
      (attendances: Attendance[]) => {
        this.loading = false;
        this.attendances = [];
        this.localCsv = [];
        this.selectedFile = null;
        this.snackBar.open('Successfully Added', 'DISMISS', {
          duration: 5000,
        });
      },
      err => {
        this.snackBar.open(err.message ? err.message : 'Error Occurred!. Check Your Internet Connection',
          (err.statusCode === 401 ? this.router.navigate(['/auth/logout']) : false) && 'DISMISS', {
            duration: 5000
          });
        this.loading = false;
      });
  }
}
