import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCutComponent } from './add-cut.component';

describe('AddCutComponent', () => {
  let component: AddCutComponent;
  let fixture: ComponentFixture<AddCutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
