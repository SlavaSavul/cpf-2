import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  Output
} from "@angular/core";
import { Film } from "../../models/film.model";
import { Genre } from "../../models/genre.model";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { debounceTime } from "rxjs/operators";
import { Subject } from "rxjs";
import { CanComponentDeactivate } from "../../services/can-deactivate-guard.service";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Component({
  selector: "app-film-form",
  templateUrl: "./film-form.component.html",
  styleUrls: ["./film-form.component.scss"],
  animations: [
    trigger("genre", [
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100px)"
        }),
        animate(
          300,
          style({
            transform: "translateX(0)",
            opacity: 1
          })
        )
      ]),
      transition("* => void", [
        style({
          opacity: 1,
          transform: "translateX(0)"
        }),
        animate(
          300,
          style({
            transform: "translateX(100px)",
            opacity: 0
          })
        )
      ])
    ])
  ]
})
export class FilmFormComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  editFimlForm: FormGroup;
  eventEmitter = new Subject();
  _film: Film;
  @ViewChild("genreInput") genreInput: any;
  @Output("onSave") eventEmitter2 = new Subject();
  @Input() set film(film: Film) {
    if (film) {
      this._film = film;
      this.editFimlForm.controls["name"].setValue(film.name);
      this.editFimlForm.controls["description"].setValue(film.description);
      this.editFimlForm.controls["posterURL"].setValue(film.posterURL);
      this.editFimlForm.controls["imDbRaiting"].setValue(film.imDbRaiting);
      this.editFimlForm.controls["date"].setValue(film.date.substring(0, 10));
      film.genres.forEach(genre => {
        this.addGenre(genre);
      });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private errorMessageService: ErrorMessageService
  ) { }

  get genresFormArray(): FormArray {
    return this.editFimlForm.get("genres") as FormArray;
  }

  ngOnInit() {
    this.editFimlForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", [Validators.required, Validators.maxLength(10000)]],
      posterURL: ["", [Validators.required]],
      imDbRaiting: [
        "",
        [
          Validators.required,
          Validators.min(0),
          Validators.max(10),
          Validators.pattern("^([0-9]*[.]?[0-9]+)$"),
          Validators.maxLength(4)
        ]
      ],
      date: ["", [Validators.required]],
      genres: this.formBuilder.array([], Validators.required)
    });

    this.eventEmitter.pipe(debounceTime(500)).subscribe((film: Film) => {
      this.eventEmitter2.next(film);
    });
  }

  markAsPristine() {
    this.editFimlForm.markAsPristine();
    this.genreInput.reset();
  }

  addNewGenre(item: Genre) {
    if (this.genreInput.valid) {
      this.addGenre(item);
    }
  }

  addGenre(item: Genre) {
    let fg = this.formBuilder.group({
      genre: [item.genre, [Validators.required]],
      id: item.id
    });
    this.genresFormArray.push(fg);
  }

  onGenreDelete(event) {
    const index = this.genresFormArray.controls.indexOf(event);
    this.genresFormArray.removeAt(index);
  }

  onGenreAdd(value) {
    let flag = true;
    this.genresFormArray.controls.forEach((elem: FormGroup) => {
      if (elem.controls["genre"].value == value) {
        this.errorMessageService.sendErrorMessage(
          "resources.alreadyExists",
          "resources.genres"
        );
        flag = false;
      }
    });

    if (flag && value !== "") {
      this.addNewGenre({ genre: value } as Genre);
    }
  }

  onSubmit() {
    if (this.editFimlForm.valid) {
      const film = {
        id: this._film ? this._film.id : null,
        name: this.editFimlForm.controls["name"].value,
        description: this.editFimlForm.controls["description"].value,
        posterURL: this.editFimlForm.controls["posterURL"].value,
        imDbRaiting: this.editFimlForm.controls["imDbRaiting"].value,
        date: this.editFimlForm.controls["date"].value,
        genres: this.genresFormArray.value
      } as Film;

      this.eventEmitter.next(film);
    }
  }

  canDeactivate() {
    if (this.editFimlForm.dirty || this.genreInput.dirty) {
      return confirm("Discard changes for Film?");
    }
    return true;
  }

  ngOnDestroy() {
    this.eventEmitter.unsubscribe();
  }
}
