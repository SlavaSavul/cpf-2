import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FilmComponent } from './components/film/film.component';
import { CreateFilmComponent } from './components/create-film/create-film.component';
import { EditFilmComponent } from './components/edit-film/edit-film.component';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { CanActivateGuard } from './services/can-activate-guard.service';
import { FilmsComponent } from './components/films/films.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

const routes: Routes = [
  { path: 'signup', component: RegistrationComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'films', redirectTo: 'films/1', pathMatch: 'full' },
  { path: 'films/:page', component: FilmsComponent },
  { path: 'favorite', pathMatch: 'full', redirectTo: 'favorite/1' },
  { path: 'favorite/:page', pathMatch: 'full', component: FavoriteComponent },
  { path: 'film/:id', component: FilmComponent },
  { path: 'createfilm', component: CreateFilmComponent, canActivate: [CanActivateGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'editfilm/:id', component: EditFilmComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'mainpage/:page', component: MainPageComponent },
  { path: '', redirectTo: 'mainpage/1', pathMatch: 'full' },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
