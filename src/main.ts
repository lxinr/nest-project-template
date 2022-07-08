import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { lightGreen, cyan } from 'kolorist';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  // 跨站点请求伪造保护 https://docs.nestjs.cn/8/security?id=csrf%e4%bf%9d%e6%8a%a4
  // Helmet 用于一些web漏洞的保护 https://docs.nestjs.cn/8/security?id=helmet
  app.use(cookieParser())
    .use(helmet())
    .use(csrf({ cookie: true }))
  await app.listen(configService.get('app.port')).then(() => {
    console.log(lightGreen('\nlistening on ' + cyan('http://' + configService.get('app.host') + ':' + configService.get('app.port'))))
  });
}
bootstrap();
