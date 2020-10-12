import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl: string = environment.apiURL;
    private headers: any;

    constructor(private http: HttpClient) {
        this.headers = { headers: new HttpHeaders(
          { 'Content-Type': 'application/json'}) };
    }

    getQuestions(searchParams: any): Observable<any>{
      return this.http.post<any>(this.apiUrl + 'question/', searchParams, this.headers).pipe();
    }
}
