import { Injectable, NotFoundException } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose'
import { Model } from "mongoose";
import { Booking } from "./bookings.model";

@Injectable({})
export class BookingService{
    // inject Booking Model with Schema to bookingModel
    constructor(@InjectModel('Booking') private bookingModel: Model<Booking>){}

    async getAllBooking(username: string, role: string){
        let result;
        if(username !== 'admin' && role !== 'admin'){
            result = await this.bookingModel.findOne({createdBy: username}).exec();
        }else{
            result = await this.bookingModel.find().exec();
        }

        return result;
    }


    async createNewBooking(
        eventType: string,
        eventLocation: string,
        datetime1: string,
        datetime2: string,
        datetime3: string,
        createdBy: string
        ){
        
        const newBooking = new this.bookingModel({
            eventType: eventType,
            eventLocation: eventLocation,
            datetime1: datetime1,
            datetime2: datetime2,
            datetime3: datetime3,
            bookingStatus: 'pending',
            createdBy: createdBy,
            approvedDate: '',
            rejectedReason: ''
        })

        const result = await newBooking.save();
        return result._id;
    }

    async cancelBooking(bookingId : string){
        const result = await this.bookingModel.deleteOne({_id: bookingId}).exec();
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find product');
        }
    }

    async approveBooking(bookingId: string, approvedDate: string){
        const updatingProduct = await this.bookingModel.findById(bookingId);
        if(approvedDate){
            updatingProduct.approvedDate = approvedDate;
            updatingProduct.bookingStatus = 'Approved';
        }
        const result = await updatingProduct.save();
        return result;
    }

    async rejectBooking(bookingId: string, rejectedReason: string){
        const updatingProduct = await this.bookingModel.findById(bookingId);
        if(rejectedReason){
            updatingProduct.rejectedReason = rejectedReason;
            updatingProduct.bookingStatus = 'Rejected';
        }
        const result = await updatingProduct.save();
        return result;
    }


}