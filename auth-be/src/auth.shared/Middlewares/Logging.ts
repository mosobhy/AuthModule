import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const transport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  transports: [transport],
});

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const headers = JSON.stringify(req.headers)
    const body = req.body ? JSON.stringify(req.body) : ''
    logger.info(`
      Request Timestamp: ${new Date().toLocaleString()},
      Request URL: ${req.originalUrl},
      Request Method: ${req.method},
      Request Headers: ${headers},
      Request Paylaod: ${body}
    `)
    getResponseLog(res, logger)
    next();
  }
}


const getResponseLog = (res: Response, logger: any) => {
  const rawResponse = res.write;
  const rawResponseEnd = res.end;
  const chunkBuffers = [];
  res.write = (...chunks) => {
    const resArgs = [];
    for (let i = 0; i < chunks.length; i++) {
      resArgs[i] = chunks[i];
      if (!resArgs[i]) {
        res.once('drain', res.write);
        i--;
      }
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    return rawResponse.apply(res, resArgs);
  };
  res.end = (...chunk) => {
    const resArgs = [];
    for (let i = 0; i < chunk.length; i++) {
      resArgs[i] = chunk[i];
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    const body = Buffer.concat(chunkBuffers).toString('utf8');
    //res.setHeader('origin', 'restjs-req-res-logging-repo');
     const responseLog = {
      response: {
        statusCode: res.statusCode,
        body: body,
        // Returns a shallow copy of the current outgoing headers
        headers: res.getHeaders(),
      },
    };
    const strResponse = JSON.stringify(responseLog)
    logger.info(`
      Response Timestamp: ${new Date().toLocaleString()},
      Response: ${strResponse}
    `)
    rawResponseEnd.apply(res, resArgs);
    return responseLog as unknown as Response;
  };
};
