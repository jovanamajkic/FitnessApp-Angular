import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentRequest } from '../../models/comment-request';
import { Comment } from '../../models/comment.model';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/comments'

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  insert(request: CommentRequest): Observable<Comment>{
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.post<Comment>(`${this.apiUrl}`, request, header);
  }

  getByProgram(programId: number, page: number, size: number) {
    return this.http.get<any>(`${this.apiUrl}/by_program/${programId}?page=${page}&size=${size}`);
  }
}
