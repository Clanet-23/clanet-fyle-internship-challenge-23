import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from './repository.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUserRepositories(username: string): Observable<Repository[]> {
    const url = '${this.apiUrl}${username}/repos'; // Construct the URL correctly
    return this.http.get<Repository[]>(url);
  }
}
