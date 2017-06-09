import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCuttsComponent } from './all-cutts.component';

describe('AllCuttsComponent', () => {
  let component: AllCuttsComponent;
  let fixture: ComponentFixture<AllCuttsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCuttsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCuttsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
