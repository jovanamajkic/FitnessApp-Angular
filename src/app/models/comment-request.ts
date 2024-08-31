export class CommentRequest {
    content: string;
    userId: number;
    programId: number;

    constructor(content: string, user: number, program: number){
        this.content = content;
        this.userId = user;
        this.programId = program;
    }
}