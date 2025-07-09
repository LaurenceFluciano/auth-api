import { IsArray, ArrayNotEmpty, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export class GetUserResponseDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
  
  @IsNotEmpty()
  @IsString()
  projectKey: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsOptional()
  @IsString()
  password?: string;
  
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  scopes: string[];
  
  @IsBoolean()
  active: boolean;
}
