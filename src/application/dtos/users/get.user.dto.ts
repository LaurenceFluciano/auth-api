import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
class GetUserIdDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    id: string;
}


class GetByCredentialsDTO {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @ApiProperty()
    email: string
	
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    projectKey: string
}

export {
    GetUserIdDTO,
    GetByCredentialsDTO
}