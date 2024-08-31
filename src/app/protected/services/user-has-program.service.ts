import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserHasProgram } from '../../models/user-has-program.model';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserHasProgramService {
  private apiUrl = 'http://localhost:8080/user_has_programs'
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  insert(request: any){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.post<UserHasProgram>(`${this.apiUrl}`, request, header);
  }

  getByUser(userId: number){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`, header);
  }

  get(userId: number, programId: number){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.get<any>(`${this.apiUrl}/${userId}/${programId}`, header);
  }
}
