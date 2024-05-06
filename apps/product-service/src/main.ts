import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const appVersion = require('../../../package.json').version;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get the ConfigService instance
  const configService = app.get<ConfigService>(ConfigService);

  // check if application is in development or stage mode
  const nodeEnv = configService.get<string>('NODE_ENV');
  if (nodeEnv === 'development') {
    // enable swagger
    const config = new DocumentBuilder()
      .setTitle('Product Reviews API')
      .setDescription('Test product reviews project REST API description')
      .setVersion(appVersion)
      .build();

    // create Swagger document
    const document = SwaggerModule.createDocument(app, config);
    document.security = [{ api_key: [] }];
    SwaggerModule.setup('swagger', app, document);
  }

  // start application on given port
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
