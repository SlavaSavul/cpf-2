import { Comment } from "./comment.model"
import { Raiting } from "./raiting.model"

export class Film {
    id: string;
    name: string;
    description: string;
    posterURL: string;
    comments: Comment[];
    raitings: Raiting[];
    date: string;
    imDbRaiting: string;
    genres: any[]
}