import 'dotenv/config'
import { User } from 'src/auth.domain/entities/User';
import { UnitOfWork } from "src/auth.infrastructure/UnitOfWork";
import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/auth.application/Interfaces/IBaseUseCase';
import { BaseRequestDto } from 'src/auth.application/DTOs/Bases/BaseRequestDto';
import { BaseResponseDto } from 'src/auth.application/DTOs/Bases/BaseResponseDto';
import { LoginRequestDto } from 'src/auth.application/DTOs/Requests/LoginRequestDto';
import { LoginResponseDto } from 'src/auth.application/DTOs/Responses/LoginResponseDto';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginUserUserCase implements IBaseUseCase<LoginRequestDto, LoginResponseDto>{
    
    constructor(
        private readonly unitOfWork: UnitOfWork
    ) { }

    async Handle(req: BaseRequestDto<LoginRequestDto>): Promise<BaseResponseDto<LoginResponseDto>> {
       const user = await this.unitOfWork.UserRepository.getEntityByGenericField("Email", req.data.email)
       if (!user) {
        return {
            data: null,
            statusCode: 400,
            message: "Either email or password is wrong!"
        }
       }

       const isPasswordCorrect = await bcrypt.compare(req.data.password, user.Password)
       if (!isPasswordCorrect) {
        return {
            data: null,
            statusCode: 400,
            message: "Either email or password is wrong!"
        }
       }

       const token = jwt.sign({ name: user.Name, email: user.Email }, String(process.env.JWT_SECRET), {
            expiresIn: '1h',
        });

    return {
        data: {
            accessToken: token
        },
        statusCode: 200,
        message: "User logged in successfully!"
       }
    }
}