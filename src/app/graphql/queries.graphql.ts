import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
 
// We use the gql tag to parse our query string into a query document
const query_GetAllProducts = gql`
  query {
    products {
      id
      name
      category
      price
      description
      image
    }  
}
`;
const query_GetAllUser = gql`
    query {
        users {
        id
        name
        email
        password    
        }
    }
`;

const query_GetProductsUser = gql`
  query ProductsByUser($name: String!) { 
    productsByUser(name: $name) {
      name
      description
      price
      category
      image
    } 
  }
`;

const mutation_Register = gql`
  mutation Register($name: String!, $password: String!) {
    register(
      input: { name: $name, password: $password }) {
        name
        password
      }
  }
`
;
const LOGIN_MUTATION  = gql`
  mutation Login($name: String!, $password: String!) {
    login(
      loginUserInput: {name: $name, password: $password}){
        access_token
        user {
          id
          name
        }
      }
  }
`;

const mutation_CreateProduct = gql`
  mutation CreateProduct($name: String!, $category: String!, $price: Float!, $image: String!, $username: String!, $description: String!){
      createProduct( 
        productsInput: {name: $name, category: $category, price: $price, image: $image, username: $username, description: $description}) {
        id
        name 
        price
        image
      }    
    }
  `
;

const MUTATION_CreateProduct = gql`
  mutation CreateProduct($productsInput: CreateProductInput!){
      createProduct( productsInput: $productsInput) {
        id
        name
      }    
    }
  `
;

const mutation_DeleteProduct = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;

const mutation_UpdateProduct = gql`
  mutation UpdateProduct($id: Int!, $updateProductInput: UpdateProductInput!) {
    updateProduct( id: $id, updateProductInput: {
        name: $name 
        category: $category 
        price: $price 
        image: $image 
        username: $username 
        description: $description
        id: $id
      }) {
      id
      name
    }
  }
`;

const mutation_UpdateProduct2 = gql`
  mutation UpdateProduct($id: Int!, $updateProductInput: UpdateProductInput!) {
    updateProduct(id: $id, updateProductInput: $updateProductInput) {
      id
      name
    }
  }
`;

const mutation_AddProductToUser = gql`
mutation AddProductToUser($userId: Int!, $productId: Int!) {
  addProductToUser(userId: $userId, productId: $productId) {
    id
    name            
  }
}
`;


export {
    query_GetAllProducts, // Listo
    query_GetAllUser,
    
    query_GetProductsUser,

    // Listo
    LOGIN_MUTATION,
    //query_ProductsByUser,

    mutation_AddProductToUser,

    MUTATION_CreateProduct,
    mutation_Register, // Listo
    mutation_CreateProduct, // Listo
    mutation_UpdateProduct, // hay un error no se cual
    mutation_UpdateProduct2, // hay un error no se cual
    mutation_DeleteProduct // Listo
    
    }