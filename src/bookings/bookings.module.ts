import { Module } from '@nestjs/common';
import { BookingController } from './bookings.controller';
import { BookingService } from './bookings.service';
import {MongooseModule} from '@nestjs/mongoose'
import { BookingSchema } from './bookings.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Booking',
                schema: BookingSchema,
                collection: 'Booking'
            }
        ])
    ],
    controllers:[BookingController],
    providers: [BookingService]
})
export class BookingsModule {}
