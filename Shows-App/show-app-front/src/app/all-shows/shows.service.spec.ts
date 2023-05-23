/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShowsService } from './shows.service';

describe('Service: Shows', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowsService]
    });
  });

  it('should ...', inject([ShowsService], (service: ShowsService) => {
    expect(service).toBeTruthy();
  }));
});
