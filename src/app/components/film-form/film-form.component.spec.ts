import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmFormComponent } from './film-form.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessageService } from 'src/app/services/error-message.service';

class FakeToastrService {
}

class FakeErrorMessageService {
  sendError(){};
}

describe('FilmFormComponent', () => {
  let component: FilmFormComponent;
  let fixture: ComponentFixture<FilmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      declarations: [ FilmFormComponent ],
      providers: [FormBuilder, 
        { provide: ToastrService, useClass: FakeToastrService },
        { provide: ErrorMessageService, useClass: FakeErrorMessageService },
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.film = {genres: [""], date: "11.11.2011"} as any;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('markAsPristine', () => {
    it('', () => {
      spyOn(component.genreInput, 'reset');
      spyOn(component.editFimlForm, 'markAsPristine');

      component.markAsPristine();

      expect(component.genreInput.reset).toHaveBeenCalled();
    });
  });

  describe('addNewGenre', () => {
    it('', () => {
      spyOn(component, 'addGenre');

      component.addNewGenre({} as any);

      expect(component.addGenre).toHaveBeenCalled();
    });
  });

  describe('onGenreDelete', () => {
    it('', () => {
      spyOn(component.genresFormArray.controls, 'indexOf').and.returnValue(1);
      spyOn(component.genresFormArray, 'removeAt');
      
      component.onGenreDelete({});

      expect(component.genresFormArray.removeAt).toHaveBeenCalled();
    });
  });

  describe('onGenreAdd', () => {
    it('', () => {
      spyOn(component, 'addNewGenre').and.returnValue(1);
      
      component.onGenreAdd({});

      expect(component.addNewGenre).toHaveBeenCalled();
    });
  });

  describe('canDeactivate', () => {
    it('should return true', () => {
      expect(component.canDeactivate()).toBeTruthy();
    });

    it('should return false', () => {
      component.editFimlForm.markAsDirty();
      spyOn(window, 'confirm').and.returnValue(false);

      expect(component.canDeactivate()).toBeFalsy();
    });
  });
});
