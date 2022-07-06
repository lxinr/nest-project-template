import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { lightGreen, cyan } from 'kolorist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  await app.listen(configService.get('app.port')).then(() => {
    console.log(lightGreen('\nlistening on ' + cyan('http://' + configService.get('app.host') + ':' + configService.get('app.port'))))
  });
}
bootstrap();
