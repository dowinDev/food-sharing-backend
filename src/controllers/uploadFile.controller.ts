// upload.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/upload.config'; // Import cấu hình từ file config

@Controller('upload')
export class UploadController {
  constructor() {}

  @Post('image')
  @UseInterceptors(FileInterceptor('body', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required!');
    }
    return {
      message: 'File uploaded successfully',
      file: file.filename,
    };
  }
}
