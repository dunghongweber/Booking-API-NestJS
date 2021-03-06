import * as mongoose from 'mongoose';

export const AuthenSchema =  new mongoose.Schema({
    username: { type:String, required: true},
    password: { type:String, required: true},
    role: { type:String, required: true},
    createdAt : { type : Date, default: Date.now }
});

export interface Authen{
    id: string;
    username: string;
    password: string;
    role: string;
}