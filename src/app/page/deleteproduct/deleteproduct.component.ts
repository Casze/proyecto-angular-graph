import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { MUTATION_CreateProduct, mutation_DeleteProduct, query_GetAllProducts } from 'src/app/graphql/queries.graphql';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  successMessage: string = '';
  
  userLoginOn: Boolean;
  userData?: User;
  loading: boolean = false; 
  
  private querySubscription?: Subscription;
  
  AllProductsAdmin: any;
  Delete_id: string | null = null; 
  isButtonEnabledD: boolean;

  constructor(
    private apollo: Apollo,
    private apolloDelete: Apollo,
    private loginService: LoginService,    
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {this.userLoginOn=userLoginOn;}
    });
    this.loginService.currentUserData.subscribe({
        next:(userData) => {this.userData=userData;}
    });
    this.loadProductAdmin();
  }
  
  //===============================================================================
  // Cargar todos Productos
  //===============================================================================
  loadProductAdmin():void{
    this.querySubscription = this.apollo.watchQuery<any>({
      query: query_GetAllProducts,
    }).valueChanges.subscribe(({ data,loading}) => {
      this.loading =loading;
      this.AllProductsAdmin = data.products;
    });
  }
  //===============================================================================
  // Eliminar Producto
  //===============================================================================
  DeleteSelectedProduct(event: any): void {
    this.Delete_id = event.target.value;
    this.isButtonEnabledD = true; // Habilita el botón cuando se selecciona un producto
  }
  deleteProduct():void{
    if (!this.Delete_id) {
      this.errorMessage = 'No product selected.';
      this.successMessage = '';
      return;
    }
    this.apolloDelete.mutate({
      mutation: mutation_DeleteProduct,
      variables: {
        id: parseInt(this.Delete_id)
      },refetchQueries: [{ query: query_GetAllProducts }]
    })
    .pipe(
      catchError(error => {
        this.errorMessage = `Deletion failed: ${error.message}`;
        this.successMessage = '';
        return throwError(error);
      })
    )
    .subscribe(() => {
      this.successMessage = 'Product successfully deleted!';
      this.errorMessage = '';
      this.isButtonEnabledD = false;
      this.router.navigate(['/delete']);
    }, error => {
      this.errorMessage = `An error occurred: ${error.message}`;
      this.successMessage = '';
    });
  }

  ngOnDestroy() {
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }
}