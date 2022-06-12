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
    async createNewBooking(@Req() req: Request){
        const eventType = req.body['eventType'];
        const eventLocation = req.body['eventLocation'];
        const datetime1 = req.body['datetime1'];
        const datetime2 = req.body['datetime2']; 
        const datetime3 = req.body['datetime3'];
        const createdBy = req.body['createdBy'];
            
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
        @Req() req: Request
    ){
        const approvedDate = req.body['approvedDate'];
        return await this.bookingService.approveBooking(bookingId, approvedDate);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('reject/:id')
    async rejectBooking(
        @Param('id') bookingId: string,
        @Req() req: Request
    ){
        const rejectedReason = req.body['rejectedReason'];
        return await this.bookingService.rejectBooking(bookingId, rejectedReason);
    }


}