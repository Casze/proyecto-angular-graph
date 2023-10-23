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

/*

const LOGIN_MUTATION  = gql`
  mutation Login($name: String!, $password: String!) {
    login(
      loginUserInput: {name: $name, password: $password}){
        access_token
        user {
          id
          name
          email
          products{
            id
          }
        }
      }
  }
`;

*/

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




/*
const mutation_UpdateProduct = gql`
  mutation UpdateProduct($id: Int!, $updateProductInput: {UpdateProductInput!}) {
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
*/
/*
const query_ProductsByUser = gql`
  query ProductsByUser($name: String!) {
    productsByUser(name: $name) {
      id
      name
      category
      price
      description
      image
      username
      user {
        // Si también necesitas campos del tipo User, agrégalos aquí
      }
    }
  }
`;
*/

/*
const mutation_UpdateProduct = gql`
  mutation UpdateProduct($id: Int!, $updateProductInput: UpdateProductInput!) {
    updateProduct(id: $id, updateProductInput: $updateProducstInput) {
      id
      name
      category
      price
      description
      image
      username
      user {
        id
        name
        email
      }
    }
  }
`;
const mutation_DeleteProduct = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;
*/


export {
    query_GetAllProducts, // Listo
    query_GetAllUser,  // Listo
    LOGIN_MUTATION,
    //query_ProductsByUser,

    mutation_Register, // Listo
    mutation_CreateProduct, // Listo
    mutation_UpdateProduct, // hay un error no se cual
    mutation_UpdateProduct2, // hay un error no se cual
    mutation_DeleteProduct // Listo
    
    }