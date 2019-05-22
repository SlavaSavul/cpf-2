import { TestBed } from '@angular/core/testing';

import { CanActivateGuard } from './can-activate-guard.service';
import { Router } from '@angular/router';

describe('CanActivateGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:  [
      CanActivateGuard,
      {
        provide: Router,
        useValue: { navigate: () => {} }
      },]
  }));

  it('should be created', () => {
    const service: CanActivateGuard = TestBed.get(CanActivateGuard);
    expect(service).toBeTruthy();
  });
});
