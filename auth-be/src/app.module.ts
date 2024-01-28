import { APP_PIPE } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthDomainModule } from './auth.domain/auth.domain.module';
import { AuthSharedModule } from './auth.shared/auth.shared.module';
import { AuthInfrastructureModule } from './auth.infrastructure/auth.infrastructure.module';
import { AuthApplicationModule } from './auth.application/auth.application.module';
import { AuthPresentationModule } from './auth.presentation/auth.presentation.module';
import { AccountController } from './auth.presentation/Controllers/AccountController';
import { HomeController } from './auth.presentation/Controllers/HomeController';
import { RegisterUserUseCase } from './auth.application/auth.v1/UseCases/RegisterUserUseCase';
import { UnitOfWork } from './auth.infrastructure/UnitOfWork';
import { UserRepository } from './auth.infrastructure/repositories/UserRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './auth.domain/entities/User';
import { VerifyTokenMiddleware } from './auth.shared/Middlewares/VerifyToken';
import { LoggingMiddleware } from './auth.shared/Middlewares/Logging';
import { LoginUserUserCase } from './auth.application/auth.v1/UseCases/LoginUserUseCase';
import { ValidationPipe } from './auth.shared/Validations/ValidationPipe';
import { BasicValidationMiddleware } from './auth.shared/Middlewares/BasicValidation';

@Module({
  imports: [
    AuthDomainModule, 
    AuthSharedModule, 
    AuthInfrastructureModule, 
    AuthApplicationModule, 
    AuthPresentationModule,
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [
    AccountController, 
    HomeController
  ],
  providers: [
    RegisterUserUseCase, 
    LoginUserUserCase, 
    UnitOfWork, 
    UserRepository, 
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*')
    consumer.apply(VerifyTokenMiddleware).forRoutes('/Home');
    consumer.apply(BasicValidationMiddleware).forRoutes("*")
  }
}
