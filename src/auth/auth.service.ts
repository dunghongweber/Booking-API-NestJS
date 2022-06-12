import { ForbiddenException, Injectable } from "@nestjs/common";

import {InjectModel} from '@nestjs/mongoose'
import { Model } from "mongoose";
import { Authen } from "./auth.model";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";

@Injectable({})
export class AuthService{
    constructor(@InjectModel('Authen') private authenModel: Model<Authen> , private jwt: JwtService){}

    //sign in method
    async signin(dto: AuthDto){
        //find user by username
        const user = await this.authenModel.findOne({username: dto.username}).exec();
        
        //if not existed, throw exception
        if(!user){
            throw new ForbiddenException('Username is incorrect');
        }
        //compare password
        const pwMatched = await argon.verify(user.password, dto.password);

        //if incorrect, throw exception
        if(!pwMatched){
            throw new ForbiddenException('Incorrect password');
        }

        const token = await this.signToken(user.username, user.role);

        //send back user
        return {
            username: user.username,
            role: user.role,
            token: token,
        }
        
    }

    //create new user, or can be modified for sign up if needed
    async createNewAccount(){
        //generate password
        // const hash = await argon.hash('password1');
        // const hash = await argon.hash('password2');
        const hash = await argon.hash('passwordadmin');

        //create new user
        const newAccount = new this.authenModel({
            // username: 'user1',
            // username: 'user2',
            username: 'admin',
            password: hash,
            role: 'admin'
        });

        //save new user to database
        const result = await newAccount.save();

        //return user id if success
        return result._id;
    }

    //helper function to show all login info
    async getAllLogins() {
        const result = await this.authenModel.find().exec();
        return result;
    }

    //access token when user signed in
    async signToken(username: string, role: string){
        const payload = {
            sub: username,
            role
        }
        
        const token = await this.jwt.signAsync(payload, {secret: 'secret'});
        return token;
    }


}

