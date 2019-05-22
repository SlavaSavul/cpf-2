import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { TranslateModule } from '@ngx-translate/core';

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

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [ RegistrationComponent ],
      providers: [
        FormBuilder,
        { provide: AccountService, useClass: FakeAccountService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('', async(() => {
      spyOn(component.eventEmitter, 'next');
      
      component.onSubmit();

      expect(component.eventEmitter.next).toHaveBeenCalled();
    }));
  });
});
