import { IsNotEmpty, IsString, ArrayNotEmpty, IsArray, IsBoolean } from "@nestjs/class-validator";

class PatchUserNameDTO {
    @IsNotEmpty()
    @IsString()
    name: string
}

class PatchUserScopesDTO {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    scopes: string[];
}

class PatchUserActiveDTO {
    @IsBoolean()
    active: boolean;
}


export {
    PatchUserNameDTO,
    PatchUserScopesDTO,
    PatchUserActiveDTO
}

