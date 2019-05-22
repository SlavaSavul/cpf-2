import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsComponent } from './films.component';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ToastrService } from 'ngx-toastr';
import { FilmFormComponent } from '../film-form/film-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { AccountService } from 'src/app/services/account.service';
import { TranslateModule } from '@ngx-translate/core';

class FakeFilmsService {
  get() {
    return new Observable();
  };
  updateFilm() {
    return new Observable();
  }
  getComments() {
    return new Observable();
  }
  createComment(value) {
    return new Observable();
  }
  getGenres() {
    return new Observable();
  }
  getAll() {
    return new Observable();
  }
}

class FakeErrorMessageService {
  sendError() { };
}

class FakeAccountService {
  checkLogin() { };
  logout() { };
  getEmail() { };
  isAuthenticated() { };
  isAdmin() {
    return true;
  };
}

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PaginatorModule, RouterModule, TranslateModule.forRoot()],
      declarations: [FilmsComponent],
      providers: [
        FormBuilder,
        { provide: FilmsService, useClass: FakeFilmsService },
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) }
        },
        {
          provide: Router,
          useValue: { navigate: () => { } }
        },
        { provide: AccountService, useClass: FakeAccountService },
        { provide: ErrorMessageService, useClass: FakeErrorMessageService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
  });

  it('should create', async(() => {
    spyOn(TestBed.get(FilmsService), 'getGenres').and.returnValue(of({ body: [] }));
    spyOn(component, 'sendWithForm');

    fixture.detectChanges();

    expect(component).toBeTruthy();
  }));

  describe('onSubmit', () => {
    it('should call sendWithForm', () => {
      spyOn(component, 'sendWithForm');

      component.onSubmit();

      expect(component.sendWithForm).toHaveBeenCalled();
    });
  });

  describe('sendWithForm', () => {
    it('should call searchFilms', () => {
      spyOn(component, 'searchFilms');
      const value = {
        year: 2000,
        name: "name",
        raiting: 5
      };
      component.createForm();
      component.form.setValue(value);

      component.sendWithForm(1, 5);

      expect(component.searchFilms).toHaveBeenCalledWith({ page: 1, limit: 5, ...value, genres: [] });
    });
  });

  describe('searchFilms', () => {
    it('should returns films', () => {
      const films = [{ id: '1' }, { id: '2' }];
      spyOn(TestBed.get(FilmsService), 'getAll').and.returnValue(of({ body: { films: films, metaData: {} } }));
      const value = {
        year: 2000,
        name: "name",
        raiting: 5
      };

      component.searchFilms({ page: 1, limit: 5, ...value, genres: [] });

      expect(component.films).toEqual(films as any);
    });

    it('should throw error', () => {
      const films = [{ id: '1' }, { id: '2' }];
      spyOn(TestBed.get(FilmsService), 'getAll').and.returnValue(throwError({}));
      const value = {
        year: 2000,
        name: "name",
        raiting: 5
      };

      component.searchFilms({ page: 1, limit: 5, ...value, genres: [] });

      expect(component.films).toEqual([]);
    });
  });

  describe('paginate', () => {
    it('should call router navigate', () => {
      spyOn(TestBed.get(Router), 'navigate');

      component.paginate({});

      expect(TestBed.get(Router).navigate).toHaveBeenCalled();
    });
  });

  describe('getLimit', () => {
    it('shoukd return 5', () => {
      component.metaData = { limit: 5 };

      expect(component.getLimit()).toEqual(5);
    });

    it('should return 0', () => {
      expect(component.getLimit()).toEqual(0);
    });
  });

  describe('getCount', () => {
    it('should return 0', () => {
      expect(component.getCount()).toEqual(0);
    });

    it('should return 1', () => {
      component.metaData = { count: 1 };
      expect(component.getCount()).toEqual(1);
    });
  });

  describe('selectGenre', () => {
    it('should select genre', () => {
      component.metaData = { limit: 5 };

      component.selectGenre('genre1');

      expect(component.selectedGenres).toEqual(['genre1']);
    });

    it('should deselect genre', () => {
      component.metaData = { limit: 5 };
      component.selectedGenres = ['genre1'];

      component.selectGenre('genre1');

      expect(component.selectedGenres).toEqual([]);
    });

    it('shoul return true if genre selected', () => {
      component.metaData = { limit: 5 };
      component.selectedGenres = ['genre1'];

      component.ifgenreSelected('genre1');

      expect(component.ifgenreSelected).toBeTruthy();
    });

  });
});
