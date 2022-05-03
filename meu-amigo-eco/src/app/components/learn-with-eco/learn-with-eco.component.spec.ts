import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnWithEcoComponent } from './learn-with-eco.component';

describe('LearnWithEcoComponent', () => {
  let component: LearnWithEcoComponent;
  let fixture: ComponentFixture<LearnWithEcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnWithEcoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnWithEcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
