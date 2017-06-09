import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable()
export class TitleService {

  private subject = new Subject<any>();

  sendTitle(title: string) {
    this.subject.next({ text: title });
  }

  clearTitle() {
    this.subject.next();
  }

  getTitle(): Observable<any> {
    return this.subject.asObservable();
  }

}
