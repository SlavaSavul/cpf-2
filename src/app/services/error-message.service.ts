import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

const errors = {'401' : 'resources.pleaseAutenticate'};

@Injectable()
export class ErrorMessageService {

  constructor(private toastr: ToastrService,
    private translateService: TranslateService) { }

  sendError(response: HttpErrorResponse, title: string) {
    const translateTitle = this.translateService.instant(title);

    if(errors[response.status]) {
      const message = this.translateService.instant(errors[response.status]);
      this.toastr.error(message, translateTitle);
    }
    else if(response.error) {
      this.toastr.error(response.error.message, translateTitle);
    }
    else {
      this.toastr.error(response.message, translateTitle);
    }
  }
    sendErrorMessage(message: string, title: string) {
      const translateTitle = this.translateService.instant(title);
      const translateMessage = this.translateService.instant(message);
      this.toastr.error(translateMessage, translateTitle);
  }
  sendSuccessMessage(message: string, title: string) {
    const translateTitle = this.translateService.instant(title);
    this.toastr.success(message, translateTitle);
  }
}
