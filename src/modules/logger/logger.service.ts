import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'
import loggerConfig from '@/config/logger.config';
// import * as os from 'os';
import { createLogger, transports, format, Logger, QueryOptions } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, json, label } = format;

@Injectable()
export class LoggerService implements OnApplicationBootstrap {
  private logger: Logger;
  
  @Inject(loggerConfig.KEY)
  private logConfig: ConfigType<typeof loggerConfig>

  private createLogger() {
    // 所有日志
    const combinedLog = new transports.DailyRotateFile({
      filename: `${this.logConfig.prefix}-%DATE%.log`,
      dirname: this.logConfig.path,
      datePattern: 'YYYY-MM-DD', // 以年月日拆分日志文件
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '14d',
      json: true,
    });

    // error 日志
    const exceptionLog = new transports.DailyRotateFile({
      filename: `${this.logConfig.prefix}-exception-%DATE%.log`,
      level: 'error',
      dirname: this.logConfig.path,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '10m',
      maxFiles: '14d',
      json: true,
    });

    const Logger = createLogger({
      level: 'info', // 储存info级别以下的logger (error, warn, info)
      format: combine(
        label({ label: this.logConfig.prefix }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
        json()
      ),
      exitOnError: false,
      transports: [combinedLog],
      exceptionHandlers: [exceptionLog], // exceptions
    });

    return Logger;
  }

  async onApplicationBootstrap() {
    this.logger = this.createLogger()
  }

  public info(data: any) {
    this.logger.info(data instanceof Object ? JSON.stringify(data) : String(data));
  }

  public warn(data: any) {
    this.logger.warn(data instanceof Object ? JSON.stringify(data) : String(data));
  }

  public error(data: any) {
    this.logger.error(data instanceof Object ? JSON.stringify(data) : String(data));
  }

  public query(options: QueryOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      this.logger.query(options, function (err, results) {
        if (err) {
          /* TODO: handle me */
          reject(err);
        }
        resolve(results);
      });
    })
  }
}
