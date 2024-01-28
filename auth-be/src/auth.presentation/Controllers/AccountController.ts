import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { ValidationPipe } from "src/auth.shared/Validations/ValidationPipe";
import { BaseRequestDto } from "src/auth.application/DTOs/Bases/BaseRequestDto";
import { LoginRequestDto } from "src/auth.application/DTOs/Requests/LoginRequestDto";
import { RegisterRequestDto } from "src/auth.application/DTOs/Requests/RegisterRequestDto";
import { LoginUserUserCase } from "src/auth.application/auth.v1/UseCases/LoginUserUseCase";
import { RegisterUserUseCase } from "src/auth.application/auth.v1/UseCases/RegisterUserUseCase";

@Controller("Account")
export class AccountController {

    constructor(
        private registerUseCase: RegisterUserUseCase,
        private loginUserUseCase: LoginUserUserCase
    ) { }

    @Post('RegisterUser')
    //@UsePipes(new ValidationPipe())
    async RegisterUser(@Body() req: BaseRequestDto<RegisterRequestDto>) {
        if (!req.data.email || !req.data.name || !req.data.password) {
            return {
                data: null,
                statusCode: 400,
                message: "Invalid data!"
            }
        }
        return await this.registerUseCase.Handle(req)
    }

    @Post('LoginUser')
    async LoginUser(@Body() req: BaseRequestDto<LoginRequestDto>) {
        if (!req.data.email || !req.data.password) {
            return {
                data: null,
                statusCode: 400,
                message: "Invalid data!"
            }
        }
        return await this.loginUserUseCase.Handle(req) 
    }
}