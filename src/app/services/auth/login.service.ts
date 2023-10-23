import { Injectable } from '@angular/core';
import { loginRequest } from './loginRequest';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { LOGIN_MUTATION } from 'src/app/graphql/queries.graphql';
import { BehaviorSubject, Observable, map, tap} from 'rxjs';
import { User } from './user';
import { ApolloError } from '@apollo/client/core';
import { userName } from './userName';
import { datosLog } from './datosLOG';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  nameis:string;
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  currentUserName: BehaviorSubject<String> = new BehaviorSubject<String>('');
  currentUserDataLogin: BehaviorSubject<datosLog> = new BehaviorSubject<datosLog>({login:{access_token: '', user: {id: 0, name: ''}}});


  constructor(private apollo: Apollo) {}

  login(credentials: loginRequest): Observable<any> { // Tipo de retorno explícito    
    console.log("Datos de la credencia?",credentials.name, credentials.password)
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION, // Usa tu consulta de mutación real aquí
      variables: {
        name: credentials.name,
        password: credentials.password,
      },
    }).pipe(      
        map(result => { 
        //console.log("Resltado de", result.data);
        //console.log("*/*/*?",result.data);
        return result.data;     
      }),
      tap( (userData: any) =>{

        this.currentUserLoginOn.next(true);
        // Obtengo todo
        this.currentUserDataLogin.next(userData);

        this.currentUserData.next(this.currentUserDataLogin.value.login.user.id);

        this.currentUserName.next(credentials.name);
        
        //console.log("Que es currentUserDataLogin?",this.currentUserDataLogin);
        //console.log("Que es currentUserData?",this.currentUserData.value);
        console.log("Asu scurrentUserData ID:",this.currentUserData);
        console.log("Asu se Obtiene ID:",this.currentUserDataLogin.value.login.user.id);
      })
    );
  }

  get userData():Observable<any>{
    return this.currentUserData;
  }

  get userLoginON():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userNameLoginON(): Observable<String> {
    return this.currentUserName.asObservable();
  }


}

/*
// MIN 1.00.00
private handleError(error: ApolloError): void {
  // Verifica si 'networkError' existe y tiene un 'status'.
  if (error.networkError && 'status' in error.networkError) {
    const status = (error.networkError as any).status; // Usamos 'any' ya que 'networkError' no tiene una propiedad 'status' estándar.
    if (status === 0) {
      console.error("Se ha producido un error de red:", error.networkError);
    } else {
      // Si hay un estado diferente de cero, probablemente quieras manejarlo de manera diferente.
      console.error("El backend retornó un error de estado:", status);
    }
  } else if (error.graphQLErrors.length > 0) {
    // Si hay errores específicos de GraphQL, puedes manejarlos aquí.
    console.error("Errores de GraphQL:", error.graphQLErrors);
  } else {
    // Para cualquier otro error desconocido.
    console.error("Se ha producido un error desconocido:", error);
  }
}
*/






/* 

return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        name: credentials.name,
        password: credentials.password
      }
    });

*/