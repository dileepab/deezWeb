import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCutComponent } from './view-cut.component';

describe('ViewCutComponent', () => {
  let component: ViewCutComponent;
  let fixture: ComponentFixture<ViewCutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
