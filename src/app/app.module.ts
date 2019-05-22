import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { AuthInterceptor } from './services/auth-Interceptor.service';
import { AccountService } from './services/account.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { ExternalService } from './services/external.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FilmsService } from './services/films.service';
import { FilmComponent } from './components/film/film.component';
import { CreateFilmComponent } from './components/create-film/create-film.component';
import { EditFilmComponent } from './components/edit-film/edit-film.component';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { CanActivateGuard } from './services/can-activate-guard.service';
import { ErrorMessageService } from './services/error-message.service';
import { FilmFormComponent } from './components/film-form/film-form.component';
import { FilmsComponent } from './components/films/films.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    MainPageComponent,
    PageNotFoundComponent,
    FilmComponent,
    CreateFilmComponent,
    EditFilmComponent,
    FilmFormComponent,
    FilmsComponent,
    FavoriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    PaginatorModule,
    PanelModule,
    ToastrModule.forRoot(),
    ProgressBarModule,
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
      },
    }),
  ],
  providers: [
    httpInterceptorProviders,
    AuthInterceptor,
    AccountService,
    ExternalService,
    FilmsService,
    CanDeactivateGuard,
    CanActivateGuard,
    ErrorMessageService,
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
