import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ApiKeyGuard } from './common/guards/api-key.guard';
// import { ParseIntPipe } from './common/pipes/parse-int.pipe';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalInterceptors(new WrapResponseInterceptor());
  // app.useGlobalPipes(new ParseIntPipe());

  await app.listen(3000);
}
bootstrap();
