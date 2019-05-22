import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { Film } from '../../models/film.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';
import { Comment } from '../../models/comment.model';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { Genre } from 'src/app/models/genre.model';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  film = new Film();
  @ViewChild('comment') comment: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService,
    public accountService: AccountService,
    private errorMessageService: ErrorMessageService
    ) { }

  ngOnInit() {    
    this.filmsService.get(this.route.snapshot.params['id']).subscribe( 
      (response: HttpResponse<any>) => this.film = response.body.data
    );
  }

  getDate() {
    return new Date();
  }

  getUserName() {
    return this.accountService.getEmail() || 'Not authenticate'
  }
  
  onSendComment(description: string) {
    const comment = { description: description, filmId: this.film.id} as Comment;

    this.filmsService.createComment(comment).subscribe(
      (response: HttpResponse<any>) => {
        this.getComments();
      },
      (error: HttpErrorResponse) => {
        if(error.status === 401) {
          this.errorMessageService.sendError(error,'resources.comment');
        }
      }
    );
      this.comment.nativeElement.value = "";
  }

  getComments() {
    this.filmsService.getComments(this.film.id).subscribe(
      (response: HttpResponse<any>) => {
       this.film.comments = response.body.comments;
      },
      (error: HttpErrorResponse) => {
          this.errorMessageService.sendError(error,'Comment');
      }
    );
  }

  getGenres(film: Film) {
    let str = "";
    if(film.genres){
      str = film.genres.map((genre) => genre.genre).join(', ');
    }
    return str;
  }

  getUrl(film: Film)
  {
    return `url('${film.posterURL}')`;
  }
}
