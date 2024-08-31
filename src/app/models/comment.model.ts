import { Program } from "./program.model";
import { User } from "./user.model";

export class Comment {
    id: number;
    content: string;
    dateTime: Date;
    user: User;
    program: Program;

    constructor(id: number, content: string, dateTime: Date, user: User, program: Program){
        this.id = id;
        this.content = content;
        this.dateTime = dateTime;
        this.user = user;
        this.program = program;
    }
}