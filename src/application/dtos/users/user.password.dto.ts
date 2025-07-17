import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class PatchPasswordDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    currentPassword: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    confirmPassword: string;
}

export {PatchPasswordDTO}