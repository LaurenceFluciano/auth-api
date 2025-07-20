import { IsNotEmpty, IsString, ArrayNotEmpty, IsArray, IsBoolean } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

class PatchUserNameDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string
}

class PatchUserScopesDTO {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @ApiProperty()
    scopes: string[];


    @IsString()
    @IsOptional()
    @ApiProperty()
    permissions: string;
}

class PatchUserActiveDTO {
    @IsBoolean()
    @ApiProperty()
    active: boolean;
}


export {
    PatchUserNameDTO,
    PatchUserScopesDTO,
    PatchUserActiveDTO
}

