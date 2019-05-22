import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilmsService } from '../../services/films.service';
import { Film } from '../../models/film.model';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { CanComponentDeactivate } from '../../services/can-deactivate-guard.service';
import { ErrorMessageService } from '../../services/error-message.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FilmFormComponent } from '../film-form/film-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.scss']
})
export class CreateFilmComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  createFimlForm: FormGroup;
  eventEmitter = new Subject();
  film = new Film();
  @ViewChild('filmForm') filmForm: FilmFormComponent;

  constructor(
    private filmService: FilmsService,
    private errorMessageService: ErrorMessageService,
    private router: Router,
    ) { }

  ngOnInit() { } 

  onSave(event) {
    console.log(event);
    this.filmService.createFilm(event)
    .subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.errorMessageService.sendSuccessMessage(`${response.body.film.name}`, 'resources.created');
        this.filmForm.markAsPristine();
        this.router.navigate(["/"]);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.errorMessageService.sendError(error, 'resources.creatFilmError');
      }
    );
  }

  canDeactivate() {
   return this.filmForm.canDeactivate();
  }

  ngOnDestroy() {
    this.eventEmitter.unsubscribe();
  }
}
