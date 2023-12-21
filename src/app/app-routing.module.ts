import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateproductsComponent } from './pages/createproducts/createproducts.component';
import { DeleteproductsComponent } from './pages/deleteproducts/deleteproducts.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { RecomendadoComponent } from './pages/recomendado/recomendado.component';
import { TopventasComponent } from './pages/topventas/topventas.component';

const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full'},
  { path: 'home', component: HomeComponent},
  { path: 'create', component: CreateproductsComponent},
  { path: 'delete', component: DeleteproductsComponent},  
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'cart', component: CartComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'recomendados', component: RecomendadoComponent},
  { path: 'topventas', component: TopventasComponent},
  { path: '**', redirectTo:'home', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
