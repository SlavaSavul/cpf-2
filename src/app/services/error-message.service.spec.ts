import { TestBed } from '@angular/core/testing';

import { ErrorMessageService } from './error-message.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('ErrorMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ToastrService, ErrorMessageService, TranslateService],
    imports: [ BrowserModule, ToastrModule.forRoot(), BrowserAnimationsModule, TranslateModule.forRoot()]
  }));

  it('should be created', () => {
    const service: ErrorMessageService = TestBed.get(ErrorMessageService);
    expect(service).toBeTruthy();
  });
});
