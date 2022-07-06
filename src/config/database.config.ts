import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  port: parseInt(process.env.DATABASE_PORT, 10),
  host: process.env.DATABASE_HOST
}))