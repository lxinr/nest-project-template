
import { registerAs } from '@nestjs/config'
import { resolve } from 'pathe'

export default registerAs('logger', () => ({
  path: resolve(__dirname, `../..${process.env.LOG_PATH}`),
  prefix: process.env.LOG_PREFIX,
}))