import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { Film } from '../../models/film.model';
import { RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Like } from 'src/app/models/like.model';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { detectChanges } from '@angular/core/src/render3';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  films: Film[] = [];
  page = 1;
  limit = 2;
  metaData: any;
  likes: Like[];
  _isLoaded = false;

  get isLoaded() {
    return this._isLoaded;
  }

  set isLoaded(val) {
    this._isLoaded = val;
  }
  
  constructor(
    private filmsService: FilmsService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public accountService: AccountService,
    private error: ErrorMessageService,
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.page = +params['page'];
        this.sendRequest({ page: this.page, limit: this.limit });
    });    

   this.getLikes();
  }

  getLikes() {
    this.filmsService.getLike().subscribe(
      (response: HttpResponse<any>) => {
        if(response.body.likes) {
          this.likes = response.body.likes;
        }
      });
  }

  sendRequest(params: { page: number, limit: number }) {
    this.filmsService.getAll({...params, favorite: true}).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        if(response.body.films.length !== 0) {
          this.films = response.body.films;
          this.metaData = response.body.metaData;
          this.isLoaded = true;
        }
      },
      (error: HttpErrorResponse) => {
        this.films = [];
        this.isLoaded = true;
      }
    );
  }

  paginate(event) {
    this.router.navigate([`/favorite/${event.page + 1}`]);
  }

  getLimit() {
    return this.metaData ? this.metaData.limit : 0;
  }

  getCount() {
    return this.metaData ? this.metaData.count : 0;
  }

  like(id: string) {
    this.filmsService.like(id).subscribe(
      (response: HttpResponse<any>) => {
        this.getLikes();
      },
      (error: HttpErrorResponse) => {
        this.error.sendError(error, 'resources.like');
      }
    );
  }
  
  isLiked(id: string) {
    return this.likes ? this.likes.some((like) => like.filmId == id) : false;
  }

}
