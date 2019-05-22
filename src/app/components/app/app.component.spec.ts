import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
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
}

describe('AppComponent', () => {
  let fixture: any;
  let app: AppComponent;
  let service: AccountService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AccountService, useClass: FakeAccountService },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.get(AccountService);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});

