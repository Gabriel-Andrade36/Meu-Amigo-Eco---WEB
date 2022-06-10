import { TestBed } from '@angular/core/testing';

import { RecomendedActivitiesService } from './recomended-activities.service';

describe('RecomendedActivitiesService', () => {
  let service: RecomendedActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecomendedActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
