import { Film } from "./film.model";

export class Raiting {
    id: string;
    description: string;
    filmId: string;
    userId: string;
    film: Film; 
}