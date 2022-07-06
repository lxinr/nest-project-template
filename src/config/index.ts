import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config'
import databaseConfig from './database.config';
import loggerConfig from './logger.config'

export default ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV}`,
  isGlobal: true,
  load: [appConfig, databaseConfig, loggerConfig]
})