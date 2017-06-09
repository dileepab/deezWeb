import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOverTimeComponent } from './add-over-time.component';

describe('AddOverTimeComponent', () => {
  let component: AddOverTimeComponent;
  let fixture: ComponentFixture<AddOverTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOverTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
