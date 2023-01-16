import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('APP_PORT');
  const documentBuilder = new DocumentBuilder()
    .setTitle('Employee Task Documentation')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('APP_BASE_URL'));
  });
}
bootstrap();
