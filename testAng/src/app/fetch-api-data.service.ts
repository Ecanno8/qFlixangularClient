import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  public userLogin(loginDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', loginDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    );
  }

  // Get one movie
  public getMovie(movieId: number): Observable<any> {
    return this.http.get(apiUrl + `movies/${movieId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get director
  public getDirector(directorId: number): Observable<any> {
    return this.http.get(apiUrl + `directors/${directorId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get genre
  public getGenre(genreId: number): Observable<any> {
    return this.http.get(apiUrl + `genres/${genreId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get user
  public getUser(userId: number): Observable<any> {
    return this.http.get(apiUrl + `users/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get favorite movies for a user
  public getFavoriteMovies(userId: number): Observable<any> {
    return this.http.get(apiUrl + `users/${userId}/favorite_movies`).pipe(
      catchError(this.handleError)
    );
  }

  // Add a movie to favorite movies
  public addFavoriteMovie(userId: number, movieId: number): Observable<any> {
    return this.http.post(apiUrl + `users/${userId}/favorite_movies`, { movieId }).pipe(
      catchError(this.handleError)
    );
  }

  // Edit user
  public editUser(userId: number, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + `users/${userId}`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(apiUrl + `users/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a movie from favorite movies
  public deleteFavoriteMovie(userId: number, movieId: number): Observable<any> {
    return this.http.delete(apiUrl + `users/${userId}/favorite_movies/${movieId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
