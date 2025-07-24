import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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

class PasswordResponseRecoveryDTO
{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
}


class RecoveryCodeDTO
{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    code: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    newPassword: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    confirmNewPassword: string
}


export {PatchPasswordDTO, PasswordResponseRecoveryDTO, RecoveryCodeDTO}