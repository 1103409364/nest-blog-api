import * as DailyRotateFile from "winston-daily-rotate-file";
import * as winston from "winston";
const format = winston.format;

export const loggerOption = {
  exitOnError: false,
  format: format.combine(
    format.colorize({ level: true }),
    format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
    format.label({ label: "RealWorld" }),
    format.splat(),
    format.printf(
      (info) =>
        `[${info.label}] ${info.timestamp} ${info.level} ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD_HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
};
