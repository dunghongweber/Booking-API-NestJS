import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Booking } from "../../bookings/bookings.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    // @InjectModel('Booking') private bookingModel: Model<Booking>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
  
    // const result = await this.bookingModel.find({username: payload.sub}).exec();
    // console.log(result);

    const user = {
      username: payload.sub,
      role: payload.role
    }
    
    
    return user;
  }
}