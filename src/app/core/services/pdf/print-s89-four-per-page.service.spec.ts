import { TestBed } from '@angular/core/testing';

import { PrintS89FourPerPageService } from './print-s89-four-per-page.service';

describe('PrintS89FourPerPageService', () => {
  let service: PrintS89FourPerPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintS89FourPerPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
