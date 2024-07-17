/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfigsService } from './configs.service';

describe('Service: Configs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigsService]
    });
  });

  it('should ...', inject([ConfigsService], (service: ConfigsService) => {
    expect(service).toBeTruthy();
  }));
});
