import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';
import { PrimengModule } from './primeng/primeng.module';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { LoginComponent } from './page/login/login.component';
import { HeaderComponent } from './shader/header/header.component';
import { RegisterComponent } from './page/register/register.component';
import { AdminComponent } from './page/admin/admin.component';
import { Apollo, ApolloModule } from 'apollo-angular';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    UserComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    ApolloModule,
  ],
  providers: [Apollo],
  bootstrap: [AppComponent],
})
export class AppModule {}
