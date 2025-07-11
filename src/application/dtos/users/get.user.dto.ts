import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator";

class GetUserIdDTO {
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
    GetUserIdDTO,
    GetByCredentialsDTO
}