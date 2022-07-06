import { Request, Response } from 'express';
import { address } from 'ip';
import * as os from 'os';

export default function formatLogger ({ req, res }: {req: Request, res: Response}) {
  return {
    url: req.url,
    params: req.params,
    body: req.body,
    method: req.method,
    statusCode: res.statusCode,
    ip: address(),
    host: os.hostname()
  }
}