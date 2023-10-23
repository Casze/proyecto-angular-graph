import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { MUTATION_CreateProduct, mutation_UpdateProduct2, query_GetAllProducts } from 'src/app/graphql/queries.graphql';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit, OnDestroy { 

  errorMessage: string = '';
  successMessage: string = '';
  
  userLoginOn: Boolean;
  userData?: User;
  loading: boolean = false;
  
  // Update
  Update_idP: string | null = null; 
  Update_id:string | null = null; ;
  Update_name:"";
  Update_category:"";
  Update_price:"";
  Update_image:"https://www.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png";
  Update_username:String;
  Update_description:"";

  selectedProduct: any;
  AllProductsAdmin: any;

  isButtonEnabled: boolean = false;
  isButtonEnabledD: boolean = false;

  private querySubscriptionAdmin: Subscription;
  private querySubscription?: Subscription;

  constructor(
    private apollo: Apollo,
    private loginService: LoginService,    
    private router: Router,
    private apolloUpdate: Apollo,
    private apolloProduct: Apollo,

  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {this.userLoginOn=userLoginOn;}
    });
    this.loginService.currentUserData.subscribe({
        next:(userData) => {this.userData=userData;}
    });
    // Suscripción para userName
    const sub3 = this.loginService.userNameLoginON.subscribe(userName => {
      this.Update_username = userName;
      console.log(this.Update_username)
    });
    this.loadProductAdmin();
    //this.UpdateProductSimple()
  }
  //===============================================================================
  // Update Producto
  UpdateProduct():void{
    this.apolloUpdate.mutate({
      mutation: mutation_UpdateProduct2,
      variables:{
        id: parseInt(this.Update_id),
        updateProductInput: {
          name: this.Update_name,
          category: this.Update_category,
          price: parseFloat(this.Update_price),
          image: this.Update_image,
          username: this.Update_name,
          description: this.Update_description,
          id: parseInt(this.Update_id)
        }
      },   
    }).subscribe(() => {
      this.router.navigate(['/update']);
    }), (err: any) => {
      alert(err);
    };
  }
  //===============================================================================
  // Cargar todos Productos
  loadProductAdmin():void{
    this.querySubscriptionAdmin = this.apolloProduct.watchQuery<any>({
      query: query_GetAllProducts,
    }).valueChanges.subscribe(({ data,loading}) => {
      this.loading =loading;
      this.AllProductsAdmin = data.products;
    });
  }
  //===============================================================================
  //Obtener todos los datos Del Producto Seleccionado  
  updateSelectedProduct(event: any): void {
    // Obtén el valor seleccionado del evento
    const selectedProductId = event.target.value;  
    // Asigna el ID seleccionado a Update_id
    this.Update_idP = selectedProductId;
    // Llama a la función para obtener los detalles del producto
    this.getProductDetailsById(this.Update_idP);
  }
  getProductDetailsById(productId: string): any {
    // Utiliza el método Array.find para buscar el producto por ID en AllProductsAdmin
    const selectedProductAdmin = this.AllProductsAdmin.find(product => product.id === parseInt(productId));  
    // Ahora puedes acceder a los detalles del producto seleccionado
    if (selectedProductAdmin) {
      const { name, category, price, image, username, description } = selectedProductAdmin;
      // Hacer lo que necesites con estos valores
      this.Update_id = productId;
      this.Update_name = name;
      this.Update_category = category;
      this.Update_price = price;
      this.Update_image = image;
      this.Update_description = description;
      this.isButtonEnabled = true;
    } else {
      // Manejar el caso en que no se encuentre el producto
    }  
  }
  

  ngOnDestroy() {
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }
}