import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 
import { AuthInterceptor } from '../../services/auth-Interceptor.service';
import { AccountService } from '../../services/account.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentLanguageCode: string;

  constructor(
    public accountService: AccountService,
    private translateService: TranslateService,
  ){
  }

  ngOnInit() {
    this.accountService.checkLogin();
    const languageCode = localStorage.getItem('languageCode');
    this.currentLanguageCode = languageCode ? languageCode : 'en';
    this.translateService.use(this.currentLanguageCode);
  }
  
  changeLanguage($event) {
    localStorage.setItem('languageCode', $event.target.value);
    this.translateService.use($event.target.value);
  }
}
