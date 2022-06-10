import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoQuizPageComponent } from './eco-quiz-page.component';

describe('EcoQuizPageComponent', () => {
  let component: EcoQuizPageComponent;
  let fixture: ComponentFixture<EcoQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoQuizPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
