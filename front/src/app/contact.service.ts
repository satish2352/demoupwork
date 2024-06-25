import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

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

  addContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacts`, data);
  }

  getAllContact(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contacts`);
  }

  editContact(data: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contacts/${data}`);
  }

  updateContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacts_update`, data);
  }

  daleteContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacts_delete`, data);
  }
}
