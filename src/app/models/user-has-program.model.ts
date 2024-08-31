import { Program } from "./program.model";
import { User } from "./user.model";

export class UserHasProgram{
    id: number;
    isCompleted: boolean;
    startDate: Date;
    userId: number;
    program: Program;

    constructor(id: number, isCompleted: boolean, startDate: Date, userId: number, program: Program){
        this.id = id;
        this.isCompleted = isCompleted;
        this.startDate = startDate;
        this.userId = userId;
        this.program = program;
    }
}