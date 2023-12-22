import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { RegisterRequest, UserDocument, UserLogeado, UserNeo4j } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3001'; // URL de tu API

  constructor(private http: HttpClient) { }

  /*============================*/
  /*         PRODUCTS          */
  /*============================*/
  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/showAllProducts`); //recordar poner <any> si es lista
  }

  getCategorys(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/showIdAndCategory`); //recordar poner <any> si es lista
  }

  getProductByID(IdProduct: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${IdProduct}`);
  }

  getProductByCategory(category: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/category/${category}`);
  }


  /*============================*/
  /*            USERS           */
  /*============================*/

  getUserLogeado(idUser: String): Observable<UserDocument> {
    return this.http.get<UserDocument>(`${this.apiUrl}/users/${idUser}`);
  }
  /*
  post_USER_registerUser(n: string, e: string, pass: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/registerUser`, { name: n, email: e, password: pass }).pipe(
      tap((userData: any) => {
        this.http.post<any>(`${this.apiUrl}/neo4j/createUser`, { userId: userData._id, userName: userData.name }).pipe(
          tap((userData: any) => {
            console.log("createUser:", userData);
          }
          ),
          catchError(this.handleError)
        );
      }
      ),
      catchError(this.handleError)
    );
  };
  */
  post_USER_registerUser(n: string, e: string, pass: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/registerUser`, { name: n, email: e, password: pass }).pipe(
      switchMap((userData: any) => 
        this.http.post<any>(`${this.apiUrl}/neo4j/createUser`, { userId: userData._id, userName: userData.name })
      ),
      tap((response: any) => {
        console.log("createUser:", response);
      }),
      catchError(this.handleError)
    );
  }

  register(credentials: RegisterRequest): Observable<any> {
    return this.http.post<UserLogeado>(`${this.apiUrl}/users/registerUser`, credentials).pipe(
      tap((userData: any) => {
        if (userData == null) {
        }
        else {
          /*
          LLamar al crear nodo
          this.ObtenerDataUser(String(userData)).subscribe((data: any) => {
            this.currentUserData.next(String(data.name)); // Suponiendo que 'data' es el objeto completo del usuario
          }); 
          */
        }
      }),
      catchError(this.handleError)
    );
  };


  /*============================*/
  /*            Neo4j           */
  /*============================*/

  post_createUser(userId: String, userName: String): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/neo4j/createUser`, { userId: userId, userName: userName }).pipe(
      tap((userData: any) => {
        console.log("createUser:", userData);
      }
      ),
      catchError(this.handleError)
    );
  };

  post_recordClick(userId: String, productId: String): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/neo4j/recordClick`, { userId: userId, productId: productId }).pipe(
      tap((userData: any) => {
        console.log("recordClick:", userData);
      }
      ),
      catchError(this.handleError)
    );
  };

  postrecommendProducts(idUser: String): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/neo4j/recommendProducts`, { userId: idUser }).pipe(
      tap((userData: any) => {
        //console.log("postrecommendProducts:",userData);
      }
      ),
      catchError(this.handleError)
    );
  };

  post_recommendProductsClothes(idUser: String): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/neo4j/recommendProductsClothes`, { userId: idUser }).pipe(
      tap((userData: any) => {
        //console.log("recommendProductsClothes:",userData);
      }
      ),
      catchError(this.handleError)
    );
  };

  post_recommendElectronicsProducts(idUser: String): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/neo4j/recommendElectronicsProducts`, { userId: idUser }).pipe(
      tap((userData: any) => {
        //console.log("recommendElectronicsProducts:",userData);
      }
      ),
      catchError(this.handleError)
    );
  };

  post_recommendFurnitureProducts(idUser: String): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/neo4j/recommendFurnitureProducts`, { userId: idUser }).pipe(
      tap((userData: any) => {
        //console.log("recommendFurnitureProducts:",userData);
      }
      ),
      catchError(this.handleError)
    );
  };

  post_recommendLaptopFurnitures(idUser: String): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/neo4j/recommendLaptopFurnitures`, { userId: idUser }).pipe(
      tap((userData: any) => {
        //console.log("recommendLaptopFurnitures:",userData);
      }
      ),
      catchError(this.handleError)
    );
  };

  post_findProductsByCategoryOfProduct(productId: String): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/neo4j/findProductsByCategoryOfProduct`, { productId: productId }).pipe(
      tap((userData: any) => {
        console.log("post_findProductsByCategoryOfProduct:",userData);
      }
      ),
      catchError(this.handleError)
    );
  };


  /*============================*/
  /*            ERROR           */
  /*============================*/

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Se ha producido un error:", error.error);
    }
    else {
      console.error("Backend retorno el codigo de estado", error.status, error.error);
    }
    return throwError(() => new Error('Algo Fallo Reintente'))
  }
}
