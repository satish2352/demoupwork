

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private apiUrl = 'http://127.0.0.1:8000/api'; //environment.BASE_URL;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }


  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  login(data: object) {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string, user_type: string, user_id: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem('user_type', user_type);
    localStorage.setItem('user_id', user_id);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  
  logout() {
 
    return this.http.post<any>(`${this.apiUrl}/logout`, this.tokenKey);

  }
 

  getDashboardStatss(): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/getDashboardStats`, null);
  }
  getDashboardStatsagents(id: any): Observable<any> {
    let data = {
      'id': id
    }
    return this.http.post<any>(`${this.apiUrl}/getDashboardStats`, data);
  }

}


