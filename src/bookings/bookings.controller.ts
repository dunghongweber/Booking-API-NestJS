import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { BookingService } from "./bookings.service";



@Controller('booking')
export class BookingController{
    constructor(private bookingService: BookingService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('allbookings')
    async getAllBooking(
        @Req() req: Request
        ){
        const username = req.user['username'];
        const role = req.user['role'];
        
        return await this.bookingService.getAllBooking(username, role);
    }

    @Post('new')
    async createNewBooking(
        @Body('eventType') eventType: string,
        @Body('eventLocation') eventLocation: string,
        @Body('datetime1') datetime1: string,
        @Body('datetime2') datetime2: string,
        @Body('datetime3') datetime3: string,
        @Body('createdBy') createdBy: string,
        ){
        return await this.bookingService.createNewBooking(eventType, eventLocation, datetime1, datetime2, datetime3, createdBy);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('cancel/:id')
    async cancelBooking(@Param('id') bookingId: string){
        return await this.bookingService.cancelBooking(bookingId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('approve/:id')
    async approveBooking(
        @Param('id') bookingId: string,
        @Body('approvedDate') approvedDate: string,
    ){
        return await this.bookingService.approveBooking(bookingId, approvedDate);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('reject/:id')
    async rejectBooking(
        @Param('id') bookingId: string,
        @Body('rejectedReason') rejectedReason: string,
    ){
        return await this.bookingService.rejectBooking(bookingId, rejectedReason);
    }


}