import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserHasCategoryService {
  private apiUrl = 'http://localhost:8080/user_has_category'

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  subscribe(request: any){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.post<any>(this.apiUrl, request, header);
  }

  unsubscribe(userId: number, categoryId: number){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.delete(`${this.apiUrl}/${userId}/${categoryId}`, header);
  }

  exists(userId: number, categoryId: number){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.get<boolean>(`${this.apiUrl}/exists/${userId}/${categoryId}`, header);
  }
}
