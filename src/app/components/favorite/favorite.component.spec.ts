import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteComponent } from './favorite.component';
import { Observable, of, throwError } from 'rxjs';
import { FilmsService } from 'src/app/services/films.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Like } from 'src/app/models/like.model';
import { compileComponent } from '@angular/core/src/render3/jit/directive';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from 'primeng/progressbar';


class FakeFilmsService {
  get(){
    return new Observable();
  };
  getLike(){
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
  getAll(value) {
    return new Observable();
  }
  like() {
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

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteComponent ],
      providers: [
        { provide: FilmsService, useClass: FakeFilmsService },
        { provide: ErrorMessageService, useClass: FakeErrorMessageService },
        {
          provide: ActivatedRoute,
          useValue: {params: of({})}
        },
        {
          provide: Router,
          useValue: { navigate: () => {} }
        },
        { provide: AccountService, useClass: FakeAccountService },
      ],
      imports: [FormsModule, ProgressBarModule, ReactiveFormsModule, RouterModule, PaginatorModule, PanelModule, BrowserAnimationsModule, TranslateModule.forRoot()],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(TestBed.get(FilmsService), 'getLike').and.returnValue(of({}));
    expect(component).toBeTruthy();
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

  it('getLikes shoud return likes', () => {
    spyOn(TestBed.get(FilmsService), 'getLike').and.returnValue(of({body: { likes: [] }}));

    component.getLikes();

    expect(component.likes).toEqual([]);
  });

  describe('like', () => {
    it('shoudl call getLikes', () => {
      spyOn(component, 'getLikes');
      spyOn(TestBed.get(FilmsService), 'like').and.returnValue(of({}));

      component.like('1');

      expect(component.getLikes).toHaveBeenCalled();
    });

    it('shoudl throw error', () => {
      spyOn(component, 'getLikes');
      spyOn(TestBed.get(FilmsService), 'like').and.returnValue(throwError({}));
      spyOn(TestBed.get(ErrorMessageService), 'sendError');

      component.like('1');

      expect(TestBed.get(ErrorMessageService).sendError).toHaveBeenCalled();
    });
  });
  
});
