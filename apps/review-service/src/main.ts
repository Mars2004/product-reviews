import { NestFactory } from '@nestjs/core';
import { ReviewServiceModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext =
    await NestFactory.createApplicationContext(ReviewServiceModule);
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReviewServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [configService.get<string>('RABBITMQ_URL')],
        queue: configService.get<string>('RABBITMQ_QUEUE_NAME'),
        queueOptions: {
          durable: false, //configService.get<boolean>('RABBITMQ_QUEUE_DURABLE'),
          // persistent: configService.get<boolean>('RABBITMQ_QUEUE_PERSISTENT'),
        },
        // noAck: false,
      },
    },
  );

  await app.listen();
}
bootstrap();
