import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
 
// We use the gql tag to parse our query string into a query document
const GetAllProducts = gql`
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
`

export {GetAllProducts}