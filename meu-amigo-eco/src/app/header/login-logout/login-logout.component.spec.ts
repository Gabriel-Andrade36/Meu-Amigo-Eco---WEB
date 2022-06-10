import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLogoutComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginLogoutComponent;
  let fixture: ComponentFixture<LoginLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
