import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateproductsComponent } from './pages/createproducts/createproducts.component';
import { DeleteproductsComponent } from './pages/deleteproducts/deleteproducts.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { RecommendComponent } from './components/recommend/recommend.component';
import { TopventasComponent } from './pages/topventas/topventas.component';
import { CategoryComponent } from './pages/category/category.component';
import { RecomendadoComponent } from './pages/recomendado/recomendado.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CreateproductsComponent,
    DeleteproductsComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    RecommendComponent,
    TopventasComponent,
    CategoryComponent,
    RecomendadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
