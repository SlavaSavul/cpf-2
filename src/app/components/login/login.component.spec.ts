import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder,
        { provide: AccountService, useClass: FakeAccountService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onsubmit', () => {
    it('', async(() => {
      spyOn(component.eventEmitter, 'next');
      
      component.onsubmit();

      expect(component.eventEmitter.next).toHaveBeenCalled();
    }));
  });
});
