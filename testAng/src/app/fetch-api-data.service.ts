import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://movieflix-bf9931a77954.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) { }

  private getToken(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : '';
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/users', userDetails) // Corrected endpoint
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/login', userDetails) // Corrected endpoint
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + '/movies', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getMovieWithID(id: string): Observable<any> {
    return this.http.get(apiUrl + `/movies/${id}`, { // Corrected endpoint
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getMovieWithTitle(title: string): Observable<any> {
    return this.http.get(apiUrl + `/movies/title/${title}`, { // Corrected endpoint
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + `/directors/${directorName}`, { // Corrected endpoint
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getUserList(): Observable<any> {
    return this.http.get(apiUrl + '/users', { // Corrected endpoint
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getUserByID(id: string): Observable<any> {
    return this.http.get(apiUrl + `/users/${id}`, { // Corrected endpoint
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public addFavoriteMovie(userID: string, title: string): Observable<any> {
    return this.http.post(apiUrl + `/users/${userID}/movies/${title}`, {}, { // Corrected endpoint
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public deleteFavoriteMovie(userID: string, title: string): Observable<any> {
    return this.http.delete(apiUrl + `/users/${userID}/movies/${title}`, { // Corrected endpoint
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public editUser(userDetails: any): Observable<any> {
    return this.http.put(apiUrl + `/users/${userDetails.id}`, userDetails, { // Corrected endpoint
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public deleteUser(userID: string): Observable<any> {
    return this.http.delete(apiUrl + `/users/${userID}`, { // Corrected endpoint and removed body
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
