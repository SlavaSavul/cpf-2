import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs'; 
import { PaginatorModule } from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import { AccountService } from 'src/app/services/account.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { Like } from 'src/app/models/like.model';
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
  getGenres() {
    return new Observable();
  }
  getAll() {
    return new Observable();
  }
  delete() {
    return new Observable();
  };
  getLike() {
    return new Observable();
  };
}

class FakeAccountService {
  checkLogin(){};
  logout(){};
  getEmail(){};
  isAuthenticated(){};
  isAdmin(){
    return true;
  };
  login(){}
}

class FakeErrorMessageService {
  sendError(){};
}

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PaginatorModule, RouterModule, ProgressBarModule, TranslateModule.forRoot()],
      declarations: [ MainPageComponent ],
      providers: [
        FormBuilder,
        { provide: FilmsService, useClass: FakeFilmsService },
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) }
        },
        {
          provide: Router,
          useValue: { navigate: () => {} }
        },
        { provide: AccountService, useClass: FakeAccountService },
        { provide: ErrorMessageService, useClass: FakeErrorMessageService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('', () => {
    spyOn(TestBed.get(FilmsService), 'delete').and.returnValue(of({}));
    spyOn(component, 'sendRequest');

    component.delete('id1');
    
    expect(component.sendRequest).toHaveBeenCalled();
  });

  describe('getLimit', () => {
    it('shoukd return 5', () => {
      component.metaData = { limit: 5 } ;    
      
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

  it('paginate', () => {
    spyOn(TestBed.get(Router), 'navigate');

    component.paginate({});

    expect(TestBed.get(Router).navigate).toHaveBeenCalled();
  });

  describe('isLiked', () =>{
    it('should retrn true', () => {
      const likes: Like[]= [{ filmId:'1'}, { filmId: '2'}];
      component.likes = likes;

      expect(component.isLiked('1')).toBeTruthy();
    })

    it('should retrn false', () => {
      
      expect(component.isLiked('3')).toBeFalsy();
    })
  });
});
