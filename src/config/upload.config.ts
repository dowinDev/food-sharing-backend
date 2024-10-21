// upload.config.ts
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

const uploadDir = path.join(__dirname, '..', 'public', 'images'); // Đường dẫn đến thư mục public/images
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const multerOptions = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      // Sử dụng thư mục đã xác định ở trên
      callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
      const uniqueSuffix = uuidv4() + extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file 5MB
  fileFilter: (
    req: any,
    file: { mimetype: string },
    callback: (arg0: BadRequestException | null, arg1: boolean) => void,
  ) => {
    // Kiểm tra loại file
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return callback(
        new BadRequestException('Only image files are allowed!'),
        false,
      );
    }
    callback(null, true);
  },
};
