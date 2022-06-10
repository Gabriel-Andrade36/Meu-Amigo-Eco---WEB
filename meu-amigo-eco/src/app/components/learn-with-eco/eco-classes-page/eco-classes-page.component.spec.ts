import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoClassesPageComponent } from './eco-classes-page.component';

describe('EcoClassesPageComponent', () => {
  let component: EcoClassesPageComponent;
  let fixture: ComponentFixture<EcoClassesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoClassesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoClassesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
