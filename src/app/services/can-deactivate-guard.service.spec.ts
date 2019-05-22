import { TestBed } from '@angular/core/testing';

import { CanDeactivateGuard, CanComponentDeactivate } from './can-deactivate-guard.service';

describe('CanDeactivateGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CanDeactivateGuard]
  }));

  it('should be created', () => {
    const service: CanDeactivateGuard = TestBed.get(CanDeactivateGuard);
    expect(service).toBeTruthy();
  });


  it('canDeactivate should return flase', () => {
    const component = {canDeactivate: () => false} as CanComponentDeactivate;

    const service: CanDeactivateGuard = TestBed.get(CanDeactivateGuard);

    expect(service.canDeactivate(component, null, null)).toBeFalsy();
  });

  it('canDeactivate should return true', () => {
    const service: CanDeactivateGuard = TestBed.get(CanDeactivateGuard);

    expect(service.canDeactivate({} as CanComponentDeactivate, null, null)).toBeTruthy();
  });
});
