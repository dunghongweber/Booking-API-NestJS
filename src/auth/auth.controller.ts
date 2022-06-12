import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signin')
    signin(@Body() dto: AuthDto)
    {   
        return this.authService.signin(dto);
    }

    @Post('create')
    createNewAccount(){
        return this.authService.createNewAccount();
    }

    @Get('all')
    getAllLogins(){
        return this.authService.getAllLogins();
    }
}