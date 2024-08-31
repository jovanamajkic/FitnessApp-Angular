import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attribute } from '../../models/attribute.model';
import { Observable } from 'rxjs';
import { AttributeValue } from '../../models/attribute-value.model';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  private apiUrl = 'http://localhost:8080/attributes';

  constructor(private http: HttpClient) { }

  getAttributes(categoryId: number): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(`${this.apiUrl}/bycategory/${categoryId}`);
  }

  getValues(attributeId: number): Observable<AttributeValue[]> {
    return this.http.get<AttributeValue[]>(`${this.apiUrl}/${attributeId}/values`);
  }
}
