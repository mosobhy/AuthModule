import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class RegisterRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}