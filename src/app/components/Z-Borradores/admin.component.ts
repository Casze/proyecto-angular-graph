
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { mutation_CreateProduct, mutation_Register, mutation_UpdateProduct, mutation_UpdateProduct2 } from 'src/app/graphql/queries.graphql';
import { ProductComponent } from '../product/product.component';
import { query_GetAllProducts, query_GetAllUser } from 'src/app/graphql/queries.graphql';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  loading: boolean;
  // Create  
  Create_name:'';
  Create_category:'';
  Create_price:'';
  Create_image:'';
  Create_username:'';
  Create_description:'';

  // Update
  Update_idP: string | null = null; 
  Update_id:'';
  Update_name:'';
  Update_category:'';
  Update_price:'';
  Update_image:'https://www.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png"';
  Update_username:'';
  Update_description:'';

  // Delete

  
  // Cargar Productos
  selectedProduct: any;
  AllProductsAdmin: any;

  isButtonEnabled: boolean = false;


  private querySubscriptionAdmin: Subscription;
  private querySubscription: Subscription;

  constructor(
    private apollo: Apollo,
    private ActivatedRoute: ActivatedRoute,

    
    private apolloCrate: Apollo,
    private apolloUpdate: Apollo,
    private apolloDelete: Apollo,
    private apolloProduct: Apollo,

    private router: Router,
    
  ) {}

  ngOnInit():void{
    this.onUpdate();
  }

  onUpdate():void{
    this.apollo.mutate({
      mutation:mutation_UpdateProduct2,
      variables: {
        id: 1,
        updateProductInput: {
          name: "aa",
          category: "XX5X",
          price: 300,
          image: "https://www.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png",
          username: "Felipe",
          description: "Prueba Manual",
          id: 1
        }
      }
    }).subscribe(() => {
      this.router.navigate(['/']);

    },err =>{
      alert(err);
    })


  }

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
      this.router.navigate(['/']);
    }), err => {
      alert(err);
    };
  }


  UpdateProduct():void{
    console.log("Entra al update? valores");
    console.log("id",this.Update_id);
    console.log("name:",this.Update_name);    
    console.log("category:",this.Update_category);
    console.log("price",this.Update_price);
    console.log("image",this.Update_image);
    console.log("username",this.Update_username);
    console.log("description",this.Update_description);

    const id = this.ActivatedRoute.snapshot.params['id'];

    this.apolloUpdate.mutate({
      mutation: mutation_UpdateProduct,
      variables:{
        id: parseInt(this.Update_id),
        updateProductInput: {
          name: this.Update_name,
          category: this.Update_category,
          price: parseFloat(this.Update_price),
          image: this.Update_image,
          username: this.Update_username,
          description: this.Update_description,
          id: parseInt(this.Update_id),
        }
      },   
    }).subscribe(() => {
      this.router.navigate(['/']);
    }), err => {
      alert(err);
    };
  }

  //directo para ver si funciona
  UpdateProductSimple():void{
    console.log("Entra al update? valores");
    console.log("id",this.Update_id);
    console.log("name:",this.Update_name);    
    console.log("category:",this.Update_category);
    console.log("price",this.Update_price);
    console.log("image",this.Update_image);
    console.log("username",this.Update_username);
    console.log("description",this.Update_description);

    const id = this.ActivatedRoute.snapshot.params['id'];

    this.apolloUpdate.mutate({
      mutation: mutation_UpdateProduct2,
      variables:{
        id: 1,
        updateProductInput: {
          name: "Manual",
          category: "XX5X",
          price: 300,
          image: "https://www.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png",
          username: "Felipe",
          description: "Prueba Manual",
          id: 1,
        }
      },   
    }).subscribe(() => {
      this.router.navigate(['/']);
    }), err => {
      alert(err);
    };
  }



  loadProductAdmin():void{
    this.querySubscriptionAdmin = this.apolloProduct.watchQuery<any>({
      query: query_GetAllProducts,
    }).valueChanges.subscribe(({ data,loading}) => {
      this.loading =loading;
      this.AllProductsAdmin = data.products;      
      console.log("Cargo loadProductAdmin()?",this.AllProductsAdmin)
    });
  }
  
  updateSelectedProduct(event: any): void {
    // Obtén el valor seleccionado del evento
    const selectedProductId = event.target.value;
  
    // Asigna el ID seleccionado a Update_id
    this.Update_id = selectedProductId;

    // Llama a la función para obtener los detalles del producto
    this.getProductDetailsById(this.Update_id);
    console.log("funciono updateSelectedProduct??",this.Update_id)
  }

  getProductDetailsById(productId: string): any {
    // Utiliza el método Array.find para buscar el producto por ID en AllProductsAdmin
    const selectedProductAdmin = this.AllProductsAdmin.find(product => product.id === parseInt(productId));
  
    // Ahora puedes acceder a los detalles del producto seleccionado
    if (selectedProductAdmin) {
      const { name, category, price, image, username, description } = selectedProductAdmin;
      console.log("funciono getProductDetailsById??",username)
      // Hacer lo que necesites con estos valores
      this.Update_name = name;
      this.Update_category = category;
      this.Update_price = price;
      this.Update_image = image;
      this.Update_username = username;
      this.Update_description = description;
      this.isButtonEnabled = true;
    } else {
      // Manejar el caso en que no se encuentre el producto
      console.log("entra al else",this.Update_description)
    }

  
  }
  
}
