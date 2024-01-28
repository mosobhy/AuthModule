import 'dotenv/config'
import { User } from 'src/auth.domain/entities/User';
import { UnitOfWork } from "src/auth.infrastructure/UnitOfWork";
import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/auth.application/Interfaces/IBaseUseCase';
import { BaseRequestDto } from 'src/auth.application/DTOs/Bases/BaseRequestDto';
import { BaseResponseDto } from 'src/auth.application/DTOs/Bases/BaseResponseDto';
import { RegisterRequestDto } from '../../DTOs/Requests/RegisterRequestDto'
import { RegisterResponseDto } from 'src/auth.application/DTOs/Responses/RegisterResponseDto';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RegisterUserUseCase implements IBaseUseCase<RegisterRequestDto, RegisterResponseDto>{
    
    constructor(
        private readonly unitOfWork: UnitOfWork
    ) { }

    async Handle(req: BaseRequestDto<RegisterRequestDto>): Promise<BaseResponseDto<RegisterResponseDto>> {
       const user = await this.unitOfWork.UserRepository.getEntityByGenericField("Email", req.data.email)
       if (user) {
        return {
            data: null,
            statusCode: 400,
            message: "User already exists!"
        }
       }

       const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT_ROUNDS))
       const passwordHash = bcrypt.hashSync(req.data.password, salt)

       const res = await this.unitOfWork.UserRepository.createEntity({Name: req.data.name, Email: req.data.email, Password: passwordHash} as User)

       const token = jwt.sign({ name: res.Name, email: res.Email }, String(process.env.JWT_SECRET), {
            expiresIn: '24h',
        });

    return {
        data: {
            accessToken: token
        },
        statusCode: 200,
        message: "User registerd successfully!"
       }
    }
}