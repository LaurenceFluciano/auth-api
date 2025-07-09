import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator";

class GetUserByIdDTO {
    @IsNotEmpty()
    @IsString()
    id: string;
}


class GetByCredentialsDTO {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string
	
    @IsNotEmpty()
    @IsString()
    projectKey: string
}

export {
    GetUserByIdDTO,
    GetByCredentialsDTO
}