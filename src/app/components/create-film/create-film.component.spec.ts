import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFilmComponent } from './create-film.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FilmFormComponent } from '../film-form/film-form.component';
import { ToastrService } from 'ngx-toastr';
import { FilmsService } from 'src/app/services/films.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';


class FakeRouter {
  navigate() {}
}

class FakeFilmsService {
  createFilm(){}
}

class FakeErrorMessageService {
  sendError(){};
  sendSuccessMessage(){}
}

class FakeToastrService {
  success() {}
}

describe('CreateFilmComponent', () => {
  let component: CreateFilmComponent;
  let fixture: ComponentFixture<CreateFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [ CreateFilmComponent, FilmFormComponent ],
      providers: [
        FormBuilder,
        { provide: FilmsService, useClass: FakeFilmsService },
        { provide: ErrorMessageService, useClass: FakeErrorMessageService },
        {
          provide: Router,
          useClass: FakeRouter
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('canDeactivate', () => {
    it('', () => {
      spyOn(component.filmForm, 'canDeactivate');

      component.canDeactivate();

      expect(component.filmForm.canDeactivate).toHaveBeenCalled();
    });
  });


  describe('onSave', () => {
    it('should call toastr success', async(() => {
      spyOn(TestBed.get(FilmsService), 'createFilm').and.returnValue(of({ body: { film: { name: 'name' }}}));
      spyOn(TestBed.get(ErrorMessageService), 'sendSuccessMessage');
      spyOn(TestBed.get(Router), 'navigate');

      component.onSave({});

      expect(TestBed.get(ErrorMessageService).sendSuccessMessage).toHaveBeenCalled();
    }));
  });

  it('should throw error', async(() => {
    spyOn(TestBed.get(FilmsService), 'createFilm').and.returnValue(throwError({ body: { film: { name: 'name' }}}));
    spyOn(TestBed.get(ErrorMessageService), 'sendError');

    component.onSave({});

    expect(TestBed.get(ErrorMessageService).sendError).toHaveBeenCalled();
  }));
});
