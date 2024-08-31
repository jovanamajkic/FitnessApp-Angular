import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseApiService {
  private apiUrl = 'https://api.api-ninjas.com/v1/exercises';
  private apiKey = 'dKVTWs2CFOi44f/0h/z6pA==x3ale6gHSVhGooS5';

  constructor(private http: HttpClient) { }

  getExercises(): Observable<any> {
    const headers = new HttpHeaders({ 'X-Api-Key': this.apiKey });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
