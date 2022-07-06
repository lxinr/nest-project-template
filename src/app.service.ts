import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'
import { LoggerService } from '@/modules/logger/logger.service'
import appConfig from '@/config/app.config';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {}

  @Inject(appConfig.KEY)
  private appConfig: ConfigType<typeof appConfig>

  getHello(): string {
    this.logger.info('hello', 'Hello World23!' + this.appConfig.port)
    return 'Hello World23!' + this.appConfig.port;
  }

  async getLog() {
    const info = await this.logger.query({
      from: new Date(+new Date() - (24 * 60 * 60 * 1000)),
      until: new Date(),
      limit: 10,
      start: 0,
      order: 'desc',
      fields: null
    });
    return info
  }
}
