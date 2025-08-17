import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ApplicationGuard } from './guard/application.guard';
import dotenv from "dotenv";
import { DomainExceptionFilter } from './utils/infrastructure/filters/domain.exception.filter';
import { UseCaseExceptionFilter } from './utils/infrastructure/filters/usecase.exception.filter';
dotenv.config()


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, 
    transform: true,
    stopAtFirstError: true,
    transformOptions: {
      enableImplicitConversion: false,
    }
  }));

  app.useGlobalGuards(app.get(ApplicationGuard));
  app.useGlobalFilters(new DomainExceptionFilter());
  app.useGlobalFilters(new UseCaseExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('User Auth API')
    .setDescription('A simple Auth API')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
