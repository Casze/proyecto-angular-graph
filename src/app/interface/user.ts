import { Document } from 'mongoose';

export interface User{
    name: String,
    email: String,
    password: String
}

export interface UserDocument extends Document, User {}

export interface LoginRequest{
    email: String,
    password: String
}