import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { HttpClient} from '@angular/common/http';
import { ExternalService } from './external.service';
import { Router } from '@angular/router';
import { ErrorMessageService } from './error-message.service';
import { of, throwError } from 'rxjs';

class FakeRouter {
  navigate(){}
}

class FakeHttpClient {
  get(){}
  post(){}
}

class FakeExternalService {
  getURL(){}
}

class FakeErrorMessageService {
  sendError(){}
}

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [],
    providers: [
      AccountService, 
      HttpClient, 
      ExternalService, 
      ErrorMessageService,
      { provide: Router, useClass: FakeRouter },
      { provide: ErrorMessageService, useClass: FakeErrorMessageService },
      { provide: HttpClient, useClass: FakeHttpClient },
      { provide: ExternalService, useClass:FakeExternalService },
    ]
  })
  service = TestBed.get(AccountService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe("isAuthenticated", () => {
    it('should return true', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue({});

      expect(service.isAuthenticated()).toBeTruthy();
    });

    it('should return false', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue(null);

      expect(service.isAuthenticated()).toBeFalsy();
    });
  });

  describe("isAdmin", () => {
    it('should return true', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue('admin');

      expect(service.isAdmin()).toBeTruthy();
    });

    it('should return false', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue(null);

      expect(service.isAdmin()).toBeFalsy();
    });
  });

  describe("getRole", () => {
    it('should return admin', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue('admin');

      expect(service.getRole()).toEqual('admin');
    });
  });

  describe("getEmail", () => {
    it('should return admin', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue('email');

      expect(service.getEmail()).toEqual('email');
    });
  });

  describe("logout", () => {
    it('should call removeItem', () => {
      spyOn(window.localStorage, 'removeItem');

      service.logout();

      expect(window.localStorage.removeItem).toHaveBeenCalled();
    });
  });
  
  describe("checkLogin", () => {
    it('should set token', () => {
      spyOn(window.localStorage, 'setItem');
      spyOn(TestBed.get(HttpClient), 'post').and.returnValue(of({ data: {access_token: 'tolen'}}));
      spyOn(TestBed.get(ExternalService), 'getURL').and.returnValue('url');

      service.checkLogin();

      expect(window.localStorage.setItem).toHaveBeenCalled();
    });

    it('should logout', () => {
      spyOn(window.localStorage, 'setItem');
      spyOn(TestBed.get(HttpClient), 'post').and.returnValue(throwError({}));
      spyOn(TestBed.get(ExternalService), 'getURL').and.returnValue('url');
      spyOn(service, 'logout');
      spyOn(TestBed.get(Router), 'navigate');

      service.checkLogin();

      expect(service.logout).toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it('should set token', () => {
      spyOn(window.localStorage, 'setItem');
      spyOn(TestBed.get(HttpClient), 'post').and.returnValue(of({body:{ data: {access_token: 'tolen'}}}));
      spyOn(TestBed.get(ExternalService), 'getURL').and.returnValue('url');

      service.login({});

      expect(window.localStorage.setItem).toHaveBeenCalled();
    });

    it('should logout', () => {
      spyOn(TestBed.get(HttpClient), 'post').and.returnValue(throwError({}));
      spyOn(TestBed.get(ExternalService), 'getURL').and.returnValue('url');
      spyOn(TestBed.get(ErrorMessageService), 'sendError');

      service.login({});

      expect(TestBed.get(ErrorMessageService).sendError).toHaveBeenCalled();
    });
  });
});
