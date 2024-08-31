import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityTrackerRequest } from '../../models/activity-tracker.request';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityTrackerService {
  private apiUrl = 'http://localhost:8080/activity_trackers'

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  create(request: ActivityTrackerRequest){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.post<any>(`${this.apiUrl}`, request, header);
  }

  getByUser(userId: number, page: number, size: number){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.get<any>(`${this.apiUrl}/user/${userId}?page=${page}&size=${size}`, header);
  }

  getAllByUser(userId: number){
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };
    return this.http.get<any>(`${this.apiUrl}/all/${userId}`, header);
  }
}
