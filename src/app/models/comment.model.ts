import { Film } from "./film.model";

export class Comment {
    id: string;
    description: string;
    filmId: string;
    userName: string;
    film: Film;
    date: string;
}