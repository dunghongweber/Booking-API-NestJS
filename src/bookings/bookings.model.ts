import * as mongoose from 'mongoose';

export const BookingSchema =  new mongoose.Schema({
    eventType: { type:String, required: true},
    eventLocation: { type:String, required: true},
    datetime1: { type:String, required: true},
    datetime2: { type:String, required: true},
    datetime3: { type:String, required: true},
    bookingStatus: { type:String},
    createdBy: {type: String, required: true},
    approvedDate: {type: String},
    rejectedReason: {type: String},
    createdAt : { type : Date, default: Date.now }
});

export interface Booking{
    id: string;
    eventType: string;
    eventLocation: string;
    datetime1: string;
    datetime2: string;
    datetime3: string;
    bookingStatus: string;
    createdBy: string;
    approvedDate: string;
    rejectedReason: string;
}