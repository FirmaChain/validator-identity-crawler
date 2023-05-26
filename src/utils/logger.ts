import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { existsSync, mkdirSync } from 'fs';

const { combine, timestamp, printf } = winston.format;

const logDir = 'logs';

if (!existsSync(logDir)) {
  mkdirSync(logDir);

  if (!existsSync(`${logDir}/info`)) {
    mkdirSync(`${logDir}/info`);
  }

  if (!existsSync(`${logDir}/error`)) {
    mkdirSync(`${logDir}/error`);
  }
}

const winstonDailyOptions = (level: string) => {
  return {
    level: level,
    datePattern: 'YYYY-MM-DD',
    dirname: `${logDir}/${level}`,
    filename: `%DATE%.log`,
    maxFiles: 30,
    zippedArchive: true,
    json: false
  }
}

const logFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    new winstonDaily(winstonDailyOptions('info')),
    new winstonDaily(winstonDailyOptions('error')),
  ],
});

logger.add(new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  )
}));

export const ErrorLog = (log: any) => {
  logger.error(`❌ [ERROR] - ${JSON.stringify(log)}`);
}

export const InfoLog = (log: any) => {
  logger.info(`✅ [INFO] - ${JSON.stringify(log)}`);
}

export const DebugLog = (log: any) => {
  logger.debug(`🚸 [DEBUG] - ${JSON.stringify(log)}`);
}
export { logger };