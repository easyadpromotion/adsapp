import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

   serverUrl = 'http://18.221.73.114:3005/';
  // serverUrl = 'http://5f92ffe27b9b.ngrok.io/';
  //imageUrl="http://5f92ffe27b9b.ngrok.io/images/";
  imageUrl="http://18.221.73.114:3005/images/";
  videoUrl="http://18.221.73.114:3005/";
 // videoUrl="http://localhost:3005/"

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getApi(url: any) {
    return this.http.get<any[]>(this.serverUrl + url).pipe(
        catchError(this.handleError)
    );
  }

  getPaymentLink(url,json){
    let httpOptions={
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      "Authorization":"Basic cnpwX3Rlc3RfdFlkRVI5MzZ2RDMxamI6QmtoanlnN05hY2txNTJVQXNES21ETzJ6"})
    }
    return this.http.post<any>(this.serverUrl + url, json).pipe(
      catchError(this.handleError)
    );
  }

  upload(formData,url) {
    return this.http.post<any>(this.serverUrl + url, formData).pipe(
      catchError(this.handleError)
    );
  }

  postApi(json: any, url) {
    return this.http.post<any>(this.serverUrl + url, json, this.httpOptions).pipe(
        catchError(this.handleError)
    );
  }
  putApi(json: any, url) {
    return this.http.put<any>(this.serverUrl + url, json, this.httpOptions).pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
