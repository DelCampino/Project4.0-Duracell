import { TestBed } from '@angular/core/testing';

import { RabbitmqService } from './rabbitmq.service';

describe('RabbitmqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RabbitmqService = TestBed.get(RabbitmqService);
    expect(service).toBeTruthy();
  });
});
