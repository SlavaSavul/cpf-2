import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { Film } from '../../models/film.model';
import { RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Like } from 'src/app/models/like.model';
import { ErrorMessageService } from 'src/app/services/error-message.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private filmsService: FilmsService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public accountService: AccountService,
    private error: ErrorMessageService
    ) { }
  films: Film[] = [];
  page = 1;
  limit = 2;
  metaData: any;
  likes: Like[];

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
      },
      (error: HttpErrorResponse) => {
    });
  }

  sendRequest(params: { page: number, limit: number }) {
    this.filmsService.getAll(params).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        if(response.body.films.length !== 0) {
          this.films = response.body.films;
          this.metaData = response.body.metaData;
        }
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/notfound']);
      }
    );
  }

  paginate(event) {
    this.router.navigate([`/mainpage/${event.page + 1}`]);
  }

  getLimit() {
    return this.metaData ? this.metaData.limit : 0;
  }

  getCount() {
    return this.metaData ? this.metaData.count : 0;
  }

  delete(id: string) {
    this.filmsService.delete(id).subscribe(
      (response: HttpResponse<any>) => {
        this.sendRequest({ page: 1, limit: this.limit });
      }
    );
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
