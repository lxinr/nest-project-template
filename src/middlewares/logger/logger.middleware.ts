import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '@/modules/logger/logger.service'
import { lightBlue, lightYellow } from 'kolorist'
import formatLogger from '@/utils/formatLogger'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log(lightBlue(`Request... ${req.method} ${req.url}`), lightYellow(res.statusCode));
    
    this.logger.info(JSON.stringify(formatLogger({ req, res })))
    next();
  }
}