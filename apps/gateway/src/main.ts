import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { NotFoundExceptionFilter } from './filter/NotFoundExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(GatewayModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enable global exception handling
  app.useGlobalFilters(new NotFoundExceptionFilter());

  // Apply cookie-parser middleware
  app.use(cookieParser());

  // Enable CORS with specific options (optional)
  app.use(cors({
    origin: '*', // 'http://example.com' // Allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allowed methods
    allowedHeaders: 'Content-Type, Authorization',  // Allowed headers
    credentials: true,  // Enable credentials
  }));

  // Global API prefix
  app.setGlobalPrefix('api');

  // Set body-parser size limit
  app.use(bodyParser.json({ limit: '10mb' }));  // Limit body payload to 10MB
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  const port = process.env.PORT_GATEWAY;

  if (!port) {
    throw new Error('PORT environment variable is not defined.');
  }

  await app.listen(port);
  console.log(`API Gateway running on http://localhost:${port}`);
}
bootstrap();