import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {MongooseModule} from '@nestjs/mongoose'
import { AuthenSchema } from "./auth.model";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { BookingService } from "src/bookings/bookings.service";
import { BookingsModule } from "src/bookings/bookings.module";


@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Authen', 
                schema: AuthenSchema, 
                collection: 'LoginInfo'
            }
        ])
        ,
        JwtModule.register({})
    ],
    controllers:[AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule{
    
}

