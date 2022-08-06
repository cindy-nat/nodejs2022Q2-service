import { Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { MyLogger } from '../logger/logger.service';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private myLogger: MyLogger;

  constructor() {
    this.myLogger = new MyLogger();
  }

  use(request, response: Response, next: NextFunction): void {
    const { method, body, params, originalUrl } = request;

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    response.on('finish', () => {
      const { statusCode } = response;

      const log = `\n method: ${method} url:${originalUrl} ${queryString}, body: ${JSON.stringify(
        body,
      )}, status: ${statusCode}`;

      this.myLogger.log(log, LoggerMiddleware.name);

      const currentPath = path.resolve(__dirname).split('/');
      currentPath.pop();
      const srcPath = currentPath.join('/');
      let version = 1;
      const logName = `logging-${version}.txt`;
      const loggingLoggingPathName = path.join(srcPath, 'logs', logName);

      if (!fs.existsSync(loggingLoggingPathName)) {
        createNewFile(logName).then(() => {
          console.log('file created');
        });
      }

      const stats = fs.statSync(loggingLoggingPathName);
      if (stats.size > +process.env.SIZE) {
        version = version + 1;
        createNewFile(`logging-${version}.txt`);
      }

      fs.appendFile(loggingLoggingPathName, log, (err) => {
        if (err) throw err;
      });
    });

    next();
  }
}

const createNewFile = async (logName) => {
  const currentPath = path.resolve(__dirname).split('/');
  currentPath.pop();
  const srcPath = currentPath.join('/');

  const loggingPath = path.join(srcPath, 'logs');

  if (!fs.existsSync(loggingPath)) {
    fs.mkdirSync(loggingPath);
  }

  fs.open(path.join(loggingPath, logName), 'w', (err) => {
    if (err) throw err;
  });
};
