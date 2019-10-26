import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { Logger } from './shared/log.service';

@Injectable({
  providedIn: 'root'
})


export class EchoService {

  private url = 'http://localhost.org:3000/data';


  constructor(private http: HttpClient, private logger: Logger) { }

  private getCustomHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return headers;
  }

  sendMessage(method: string, data: string): Observable<any> {

    this.logger.log(method);

    let response = null;

    switch (method) {
      case 'POST':
        response = this.http.post( this.url, data, { headers: this.getCustomHeaders() } );
        break;
      case 'PUT':
        response = this.http.put( this.url, data, { headers: this.getCustomHeaders() } );
        break;
      case 'PATCH':
        response = this.http.patch( this.url, data, { headers: this.getCustomHeaders() } );
        break;
      case 'GET':
        response = this.http.get( this.url, { headers: this.getCustomHeaders() } );
        break;
      case 'DELETE':
        response = this.http.delete( this.url, { headers: this.getCustomHeaders() } );
        break;
    }

    return response;
  }
}
