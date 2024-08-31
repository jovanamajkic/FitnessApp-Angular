import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserUpdateRequest } from '../../models/update-user-request.model';
import { TokenService } from '../../auth/services/token.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  updateUser(request: UserUpdateRequest): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`
    });
    
    return this.http.put<User>(`${this.apiUrl}/update/` + this.tokenService.getUser().username, request, { headers });
  }

  changePassword(currPassword: string, newPassword: string): Observable<any>{
    const request = {
      currentPassword: currPassword,
      newPassword: newPassword
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`
    });

    return this.http.put<User>(`${this.apiUrl}/change-password/` + this.tokenService.getUser().username, request, { headers });
  }

  getAll(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`
    });

    return this.http.get<User[]>(`${this.apiUrl}`, { headers });
  }
}
