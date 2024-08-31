import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})

export class RssFeedService {
  private url = 'feed/AceFitFacts';

  constructor(private http: HttpClient) { }

  getFeedData(): Observable<any> {
    return this.http.get(this.url, { responseType: 'text' as 'text', headers: new HttpHeaders({ 'Accept': 'application/rss+xml' }) }).pipe(
      map((response: string) => {
        let feedData: any;
        xml2js.parseString(response, { trim: true, explicitArray: false }, (err: any, result: any) => {
          if (err) {
            throw new Error('Error parsing XML');
          } else {
            feedData = result;
          }
        });
        return feedData;
      })
    );
  }
}
