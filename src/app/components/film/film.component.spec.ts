import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmComponent } from './film.component';
import { Observable, of, throwError } from 'rxjs'; 
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ToastrService } from 'ngx-toastr';
import { FilmFormComponent } from '../film-form/film-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import { AccountService } from 'src/app/services/account.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

class FakeFilmsService {
  get(){
    return new Observable();
  };
  updateFilm() {
    return new Observable();
  }
  getComments(){
    return new Observable();
  }
  createComment(value) {
    return new Observable();
  }
}

class FakeErrorMessageService {
  sendError(){};
}

class FakeToastrService {
  success() {}
}

class FakeAccountService {
  checkLogin(){};
  logout(){};
  getEmail(){};
  isAuthenticated(){};
  isAdmin(){
    return true;
  };
}

describe('FilmComponent', () => {
  let component: FilmComponent;
  let fixture: ComponentFixture<FilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, PaginatorModule, PanelModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      declarations: [FilmComponent, FilmFormComponent],
      providers: [
        FormBuilder,
        { provide: FilmsService, useClass: FakeFilmsService },
        { provide: ErrorMessageService, useClass: FakeErrorMessageService },
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {params: {'id': '1'}}}
        },
        { provide: AccountService, useClass: FakeAccountService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getComments', () => {
    it('', () => {
      spyOn(TestBed.get(FilmsService), 'getComments').and.returnValue(of({ body: { comments: []}}));

      component.getComments();

      expect(component.film.comments).toEqual([]);
    });

    it('', () => {
      spyOn(TestBed.get(FilmsService), 'getComments').and.returnValue(throwError({}));
      spyOn(TestBed.get(ErrorMessageService), 'sendError');
  
      component.getComments();
  
      expect(TestBed.get(ErrorMessageService).sendError).toHaveBeenCalled();
    });
  });

 


  describe('onSendComment', () => {
    it('should call getComments', async(() => {
      component.film.id = '1';

      spyOn(TestBed.get(FilmsService), 'createComment').and.returnValue(of(new HttpResponse<any>()));
      spyOn(component, 'getComments');

      component.onSendComment("comment 1");

      expect(component.getComments).toHaveBeenCalled();
    }));
    
    it('should throw error', async(() => {
      component.film.id = '1';

      spyOn(TestBed.get(FilmsService), 'createComment').and.returnValue(throwError(new HttpErrorResponse({status: 401})));
      spyOn(TestBed.get(ErrorMessageService), 'sendError');
  
      component.onSendComment("comment 1");
  
      expect(TestBed.get(ErrorMessageService).sendError).toHaveBeenCalled();
    }));
  });
});
