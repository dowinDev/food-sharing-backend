import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = createLogger({
  level: 'error', // Mức độ ghi log, có thể là 'info', 'warn', 'error', v.v.
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`,
    ),
  ),
  transports: [
    new transports.Console(), // Ghi log ra console (terminal)
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log', // Đường dẫn file log, xoay theo ngày
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m', // Kích thước tối đa cho mỗi file log (20 MB ở đây)
      maxFiles: '14d', // Số ngày lưu trữ log, ở đây là 14 ngày
      level: 'error', // Chỉ ghi các log từ mức error trở lên
    }),
  ],
});

export default logger;
