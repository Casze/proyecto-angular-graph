import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
 
// We use the gql tag to parse our query string into a query document
const query_GetAllProducts = gql`
    query {
        products{
        id,
        name,
        category,
        price,
        description,
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
    register(input: { name: $name, password: $password }) {
      name
      password
    }
  }
`;
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

const mutation_CreateProduct = gql`
  mutation CreateProduct($productsInput: CreateProductInput!) {
    createProduct(productsInput: $productsInput) {
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

const mutation_UpdateProduct = gql`
  mutation UpdateProduct($id: Int!, $updateProductInput: UpdateProductInput!) {
    updateProduct(id: $id, updateProductInput: $updateProductInput) {
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
    //query_ProductsByUser,

    mutation_Register, // Listo
    //mutation_CreateProduct,
    //mutation_UpdateProduct,
    //mutation_DeleteProduct
    }