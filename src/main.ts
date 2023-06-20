import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60 * 60 * 24 // 1day
      }
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  const PORT = process.env.PORT || 8080
  try {
    await app.listen(PORT,() => console.log(`Server is Running on ${PORT}`));
    
  } catch (error) {
    console.log(error)
  }
  
}
bootstrap();
