import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './page/register/register.component';
import { AdminComponent } from './page/admin/admin.component';
import { LoginComponent } from './page/login/login.component';
import { CreateproductComponent } from './page/createproduct/createproduct.component';
import { DeleteproductComponent } from './page/deleteproduct/deleteproduct.component';
import { UpdateproductComponent } from './page/updateproduct/updateproduct.component';


const routes: Routes = [
  { path: '', redirectTo:'/inicio',pathMatch:'full'},
  { path: 'inicio', component: ProductComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'iniciar-sesion', component: LoginComponent},  
  { path: 'create', component: CreateproductComponent},
  { path: 'delete', component: DeleteproductComponent},
  { path: 'update', component: UpdateproductComponent},
  { path: '**',redirectTo:'/inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
