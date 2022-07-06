import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Config from '@/config'
import { LoggerModule } from '@/modules/logger/logger.module';

@Module({
  imports: [
    Config,
    LoggerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
