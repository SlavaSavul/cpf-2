import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs'; 
import { EditFilmComponent } from './edit-film.component';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ToastrService } from 'ngx-toastr';
import { FilmFormComponent } from '../film-form/film-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

class FakeFilmsService {
  get(){
    return new Observable();
  };
  updateFilm() {
    return new Observable();
  }
}

class FakeErrorMessageService {
  sendError(){}
  sendSuccessMessage(){}

}

describe('EditFilmComponent', () => {
  let component: EditFilmComponent;
  let fixture: ComponentFixture<EditFilmComponent>;
  let filmService : FilmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [ EditFilmComponent, FilmFormComponent ],
      providers: [
        FormBuilder,
        { provide: FilmsService, useClass: FakeFilmsService },
        { provide: ErrorMessageService, useClass: FakeErrorMessageService },
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {params: {'id': '1'}}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFilmComponent);
    component = fixture.componentInstance;
    filmService = TestBed.get(FilmsService);
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
    it('', () => {
      spyOn(filmService, 'updateFilm').and.returnValue(of({ body: { data: { name: 'name' }}}));
      spyOn(TestBed.get(ErrorMessageService), 'sendSuccessMessage');

      component.onSave({});

      expect(TestBed.get(ErrorMessageService).sendSuccessMessage).toHaveBeenCalled();
    });
  });

  it('', () => {
    spyOn(filmService, 'updateFilm').and.returnValue(throwError({ body: { data: { name: 'name' }}}));
    spyOn(TestBed.get(ErrorMessageService), 'sendError');

    component.onSave({});

    expect(TestBed.get(ErrorMessageService).sendError).toHaveBeenCalled();
  });
});
