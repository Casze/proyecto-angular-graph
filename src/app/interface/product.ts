import { Document } from 'mongoose';

export interface Product{
    name: string;
    price: number;
    description: string;
    brand: string;
    inStock: Boolean,
    sizeAvailable: [{ type: String }],
    image: { type: String },
    reviews: [{ type: String }],
    Category: { type: String },
}
export interface ProductDocument extends Document, Product {}