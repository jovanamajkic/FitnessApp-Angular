import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgramHasAttributeValueRequest } from '../../models/program-has-attribute-value-request.model';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramHasAttributeValueService {
  private apiUrl = 'http://localhost:8080/program_has_attribute_values';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  insert(request: ProgramHasAttributeValueRequest): any{
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      ),
    };

    return this.http.post<any>(`${this.apiUrl}`, request, header);
  }

  getProgramsByValue(valueId: number) {
    return this.http.get<any>(`${this.apiUrl}/value/${valueId}`);
  }

  getValuesByProgram(programId: number){
    return this.http.get<any>(`${this.apiUrl}/program/${programId}`);
  }
}
