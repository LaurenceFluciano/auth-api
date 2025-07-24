import { ApiResponseProperty, ApiProperty } from "@nestjs/swagger"
import { IsArray, ArrayNotEmpty, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export class GetUserResponseDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @ApiResponseProperty()
  id: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @ApiResponseProperty()
  projectKey: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @ApiResponseProperty()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  @ApiResponseProperty()
  email: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  @ApiResponseProperty()
  password?: string;
  
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty()
  @ApiResponseProperty()
  scopes: string[];
  
  @IsBoolean()
  @ApiProperty()
  @ApiResponseProperty()
  active: boolean;
}

export class SafeUserResponseDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  projectKey: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty()
  scopes: string[];

  @IsBoolean()
  @ApiProperty()
  active: boolean;
}