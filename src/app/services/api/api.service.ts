import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3001'; // URL de tu API

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/showAllProducts`); //recordar poner <any> si es lista
  }

  getUserEjemplo() : Observable<any>{
    return this.http.get(`${this.apiUrl}/users/657ddc170a6ad5248fc89b32`);
  }
}
