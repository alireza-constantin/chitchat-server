import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  const PORT = process.env.PORT || 8080
  try {
    await app.listen(PORT,() => console.log(`Server is Running on ${PORT}`));
    
  } catch (error) {
    console.log(error)
  }
  
}
bootstrap();
