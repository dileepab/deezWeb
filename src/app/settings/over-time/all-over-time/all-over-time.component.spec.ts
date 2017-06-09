import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOverTimeComponent } from './all-over-time.component';

describe('AllOverTimeComponent', () => {
  let component: AllOverTimeComponent;
  let fixture: ComponentFixture<AllOverTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOverTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
