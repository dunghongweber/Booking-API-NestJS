import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import {MongooseModule} from "@nestjs/mongoose";


@Module({
  imports: [
    AuthModule,
    BookingsModule,
    MongooseModule.forRoot("mongodb+srv://dunghong123:pass123word456@cluster0.kv48y.mongodb.net/BookingApp?retryWrites=true&w=majority"),
  ],
})
export class AppModule {}
