import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    // Enable CORS
    app.enableCors({
      origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
      credentials: false,
    });

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }));

    // Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('Forte Asset Manager API')
      .setDescription('API for managing company assets and employees')
      .setVersion('1.0')
      .addTag('companies')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = parseInt(process.env.PORT) || 3000;
    await app.listen(port);
    
    console.log('='.repeat(50));
    console.log('🚀 SERVIDOR INICIADO COM SUCESSO!');
    console.log('='.repeat(50));
    console.log(`📡 Backend: http://localhost:${port}`);
    console.log(`📋 Companies API: http://localhost:${port}/companies`);
    console.log(`📚 Swagger: http://localhost:${port}/api/docs`);
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

bootstrap().catch(err => {
  console.error('❌ Falha crítica:', err);
  process.exit(1);
});

