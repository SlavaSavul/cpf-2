import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ExternalService } from './external.service';
import { Film } from '../models/film.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor( 
    private http: HttpClient,
    private externalService: ExternalService
  ) { }

  getAll(params) {
   return this.http.get(`${this.externalService.getURL()}/api/films`, { params, observe: 'response' });
  }

  get(id: string){
    return this.http.get(`${this.externalService.getURL()}/api/films/${id}`, { observe: 'response' });
  }

  createFilm(film: Film){
    return this.http.post(`${this.externalService.getURL()}/api/films/`, film, { observe: 'response' });
  }

  updateFilm(film: Film){
    return this.http.put(`${this.externalService.getURL()}/api/films/`, film, { observe: 'response' });
  }

  getGenres() {
    return this.http.get(`${this.externalService.getURL()}/api/films/genres`, { observe: 'response' });
  }

  createComment(comment: Comment) {
    return this.http.post(`${this.externalService.getURL()}/api/comments/`, comment, { observe: 'response' });
  }

  getComments(id: string) {
    return this.http.get(`${this.externalService.getURL()}/api/films/${id}/comments`, { observe: 'response' });
  }
  
  delete(id: string){
    return this.http.delete(`${this.externalService.getURL()}/api/films/${id}`, { observe: 'response' });
  }
  
  like(id: string) {
    return this.http.post(`${this.externalService.getURL()}/api/films/like/`, { FilmId: id } ,{ observe: 'response' });
  }

  getLike() {
    return this.http.get(`${this.externalService.getURL()}/api/films/like/`, { observe: 'response' });
  }
}
