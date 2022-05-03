import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoQuizComponent } from './eco-quiz.component';

describe('EcoQuizComponent', () => {
  let component: EcoQuizComponent;
  let fixture: ComponentFixture<EcoQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
