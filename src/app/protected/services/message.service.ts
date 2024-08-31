import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/messages';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  create(request: any){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.post<any>(`${this.apiUrl}`, request, header);
  }

  getAllByToUser(toUserId: number){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.get<any[]>(`${this.apiUrl}/to_user/${toUserId}`, header);
  }

  markAsRead(id: number){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.put(`${this.apiUrl}/${id}`, {}, header);
  }
}
