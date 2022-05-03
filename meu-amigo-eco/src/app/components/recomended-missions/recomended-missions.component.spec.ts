import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendedMissionsComponent } from './recomended-missions.component';

describe('RecomendedMissionsComponent', () => {
  let component: RecomendedMissionsComponent;
  let fixture: ComponentFixture<RecomendedMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendedMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendedMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
