import { Document } from 'mongoose';

export interface User{
    name: String,
    email: String,
    password: String
}

export interface UserDocument extends Document, User {}

export interface LoginRequest{
    username: String,
    password: String
}

export interface UserLogeado{
    _id:String
}

export interface UserLogeadoName{
    username:String
}

export interface UserNeo4j{
    userId:String
}