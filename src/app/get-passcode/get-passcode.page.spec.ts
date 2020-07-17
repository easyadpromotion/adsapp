import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPasscodePage } from './get-passcode.page';

describe('GetPasscodePage', () => {
  let component: GetPasscodePage;
  let fixture: ComponentFixture<GetPasscodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetPasscodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPasscodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
