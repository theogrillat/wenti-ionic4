import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninWentiPage } from './signin-wenti.page';

describe('SigninWentiPage', () => {
  let component: SigninWentiPage;
  let fixture: ComponentFixture<SigninWentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninWentiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninWentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
