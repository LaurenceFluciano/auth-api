import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

class LoginDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @IsEmail()
    email: string
    
    @IsOptional()
    @ApiProperty()
    @IsString()
    password: string
}



export {
    LoginDTO
}