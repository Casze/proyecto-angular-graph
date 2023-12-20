import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDocument } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3001'; // URL de tu API

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/showAllProducts`); //recordar poner <any> si es lista
  }

  getUserLogeado(idUser:String) : Observable<UserDocument>{
    return this.http.get<UserDocument>(`${this.apiUrl}/users/${idUser}`);
  }

  
}
