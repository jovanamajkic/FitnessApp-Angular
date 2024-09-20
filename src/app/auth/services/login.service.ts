import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from '../../models/registration-request.model';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { LoginRequest } from '../../models/login-request.model';
import { LoginResponse } from '../../models/login-response.model';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, public tokenService: TokenService, public jwtService: JwtHelperService) { }

  register(request: RegistrationRequest): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        if (response && response.token) {
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        this.isAuthenticatedSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.tokenService.logout();
    this.isAuthenticatedSubject.next(false);
  }

  activate(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/activate?code=${code}`);
  }

  resendActivation(request: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-activation`, request);
  }

  public isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    return !this.jwtService.isTokenExpired(token);
  }
}
