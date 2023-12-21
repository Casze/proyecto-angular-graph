import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { 
  Observable, 
  catchError, 
  throwError,
  BehaviorSubject,
  tap
} from 'rxjs';
import { LoginRequest, User, UserDocument, UserLogeado, UserLogeadoName } from 'src/app/interface/user';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3001';

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserId: BehaviorSubject<UserLogeado> = new BehaviorSubject<UserLogeado>({_id:null});
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>(null);

  constructor(
    private http:HttpClient,
    private apiService: ApiService,
  ) { }
  
  ObtenerDataUser(idUser:String){
    return this.apiService.getUserLogeado(idUser);
  }

  login(credentials: LoginRequest): Observable<UserLogeado> {
    return this.http.post<UserLogeado>(`${this.apiUrl}/users/login`, credentials).pipe(
      tap((userData: UserLogeado) => {        
        if(userData==null){
          this.currentUserLoginOn.next(false);
        }
        else{
          this.currentUserLoginOn.next(true);
          this.currentUserId.next(userData); 
          this.ObtenerDataUser(String(userData)).subscribe((data: any) => {
            this.currentUserData.next(String(data.name)); // Suponiendo que 'data' es el objeto completo del usuario
          });          
          //console.log("dato obtenido:",userData);
          //console.log("currentUserLoginOn:",this.currentUserLoginOn);
          //console.log("currentUserData:",this.currentUserData);
        }        
      }),
      catchError(this.handleError)
    );
  }
  


  private handleError(error: HttpErrorResponse){
    if (error.status===0) {      
      console.error("Se ha producido un error:", error.error);
    } 
    else {
      console.error("Backend retorno el codigo de estado", error.status,error.error);
    }
    return throwError(() => new Error('Algo Fallo Reintente'))
  }

  get userData():Observable<any>{
    return this.currentUserId.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

}
