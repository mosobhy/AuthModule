import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from './auth.shared/Validations/ValidationPipe';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as express from 'express'
import * as path from 'path'
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")

  app.enableCors({
    //origin: "http://localhost:3000"
    origin: "*"
  })

  const options = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('This is an authentication module for user registration and login')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  app.use('/logs', express.static(path.join(__dirname, '..', 'logs')));

  console.log(`Server is running on http://localhost:${process.env.PORT}`)
  await app.listen(process.env.PORT);
}
bootstrap();
