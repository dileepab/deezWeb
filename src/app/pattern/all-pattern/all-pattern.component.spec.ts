import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPatternComponent } from './all-pattern.component';

describe('AllPatternComponent', () => {
  let component: AllPatternComponent;
  let fixture: ComponentFixture<AllPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
