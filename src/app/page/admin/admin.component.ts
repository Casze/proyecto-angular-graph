
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { mutation_CreateProduct, mutation_DeleteProduct, mutation_Register, mutation_UpdateProduct, mutation_UpdateProduct2 } from 'src/app/graphql/queries.graphql';
import { ProductComponent } from '../../components/product/product.component';
import { query_GetAllProducts, query_GetAllUser } from 'src/app/graphql/queries.graphql';
import { User } from 'src/app/services/auth/user';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  userLoginOn:Boolean;
  userData?:User;

  loading: boolean;
  // Create  
  Create_name:'';
  Create_category:'';
  Create_price:''; // Float
  Create_image: '';
  Create_username:'';
  Create_description:'';

  // Update
  Update_idP: string | null = null; 
  Update_id:string | null = null; ;
  Update_name:"";
  Update_category:"";
  Update_price:"";
  Update_image:"https://www.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png";
  Update_username:"";
  Update_description:"";

  // Delete

  Delete_id: string | null = null; 
  
  // Cargar Productos
  selectedProduct: any;
  AllProductsAdmin: any;

  isButtonEnabled: boolean = false;
  isButtonEnabledD: boolean = false;

  private querySubscriptionAdmin: Subscription;
  private querySubscription: Subscription;

  constructor(
    private apolloCrate: Apollo,
    
    private ActivatedRoute: ActivatedRoute,
    private loginService : LoginService,    

    private apolloUpdate: Apollo,
    private apolloDelete: Apollo,
    private apolloProduct: Apollo,

    private router: Router,
    
  ) {}

  ngOnInit():void{
    this.loadProductAdmin();
    //this.UpdateProductSimple();

    //Obtengo los datos y estado del usuario
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
    });
    this.loginService.currentUserData.subscribe(
      {
        next:(userData) => {
          this.userData=userData;
        }
    });
    console.log("Estado", this.userLoginOn);
  }

  //===============================================================================
  // Crear Producto

  CreateProduct():void{    
    this.isButtonEnabled = false;
    this.apolloCrate.mutate({
      mutation: mutation_CreateProduct,
      variables:{     
        name: this.Create_name,
        category: this.Create_category,
        price: parseFloat(this.Create_price),
        image: this.Create_image,
        username: this.Create_username,
        description: this.Create_description
      },
    }).subscribe(() => {
      this.router.navigate(['/admin']);
    }), err => {
      alert(err);
    };
  }

  //===============================================================================
  // Crear Producto
  UpdateProduct():void{
    this.apolloUpdate.mutate({
      mutation: mutation_UpdateProduct2,
      variables:{
        id: parseInt(this.Update_id),
        updateProductInput: {
          name: this.Update_name,
          category: this.Update_category,
          price: parseFloat(this.Update_price),
          image: "https://www.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png",
          username: this.Update_name,
          description: this.Update_description,
          id: parseInt(this.Update_id)
        }
      },   
    }).subscribe(() => {
      this.router.navigate(['/']);
    }), (err: any) => {
      alert(err);
    };
  }
  //===============================================================================
  // Crear producto Directo para ver si funciona
 
  UpdateProductSimple():void{
    
    console.log("Entra al update? valores");
    console.log("id",this.Update_id);
    console.log("name:",this.Update_name);    
    console.log("category:",this.Update_category);
    console.log("price",this.Update_price);
    console.log("image",this.Update_image);
    console.log("username",this.Update_username);
    console.log("description",this.Update_description);

    this.apolloUpdate.mutate({
      mutation: mutation_UpdateProduct2,
      variables:{
        id: 23,
        updateProductInput: {
          name: "Product",
          category: "Product",
          price: 666,
          image: "https://www.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png",
          username: "Product",
          description: "Prueba Product",
          id: 23
        }
      },   
    }).subscribe(() => {
      this.router.navigate(['/admin']);
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
      this.Update_username = username;
      this.Update_description = description;
      this.isButtonEnabled = true;
    } else {
      // Manejar el caso en que no se encuentre el producto
    }  
  }
  //===============================================================================
  // Eliminar Producto
  DeleteSelectedProduct(event: any): void {
    // Obtén el valor seleccionado del evento
    const selectedProductId = event.target.value;  
    // Asigna el ID seleccionado a Update_id
    this.Delete_id = selectedProductId;
    this.isButtonEnabledD=true;
  }

  deleteProduct():void{
    this.apolloDelete.mutate({
      mutation: mutation_DeleteProduct,
      variables:{
        id: parseInt(this.Delete_id)
        }
    }).subscribe(() => {
      this.router.navigate(['/admin']);
    }), err => {
      alert(err);
    };
    this.isButtonEnabledD=false;
  }

  
}
