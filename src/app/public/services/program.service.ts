import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../../models/program.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProgramRequest } from '../../models/program-request.model';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private apiUrl = 'http://localhost:8080/programs';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(this.apiUrl);
  }

  getByUser(userId: number,): Observable<Program[]>{
    return this.http.get<Program[]>(`${this.apiUrl}/user/${userId}`);
  }

  getById(id: number): Observable<Program>{
    return this.http.get<Program>(`${this.apiUrl}/${id}`);
  }

  create(request: ProgramRequest){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.post<Program>(`${this.apiUrl}`, request, header);
  }

  delete(id: number){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.delete(`${this.apiUrl}/${id}`, header);
  }
}
