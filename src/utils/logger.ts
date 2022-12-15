import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = 'logs';
const { combine, timestamp, printf } = winston.format;

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
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/info',
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
      json: false
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
      json: false
    }),
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