import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Issue } from './issue';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {

  maxItemsPerPage = environment.maxItemsPerPage;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getIssues (page): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl + '?page=' + page + '&per_page=' + this.maxItemsPerPage + '&state=all')
      .pipe(
        tap(issues => console.log(`fetched issues`)),
        catchError(this.handleError('getIssues', []))
      );
  }

  getIssue (numberId: number): Observable<Issue> {
    return this.http.get<Issue>(this.apiUrl + `/${numberId}`)
      .pipe(
        tap(issue => console.log(`fetched issue id=${numberId}`)),
        catchError(this.handleError<Issue>(`getIssue id=${numberId}`))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed: ' + error);
      return of(result as T);
    };
  }
  private buildUrl(page: number): String {
    return this.apiUrl + '?page=' + page + '&per_page=' + this.maxItemsPerPage;
  }

}
