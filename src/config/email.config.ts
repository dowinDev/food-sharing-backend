import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailConfig {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'Gmail', // hoặc dịch vụ email khác
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: '"food-sharing" <process.env.EMAIL_USER>',
      to: email,
      subject: 'Xác thực tài khoản',
      text: `Mã OTP của bạn là: ${otp}. thời gian có hiệu lức trong vòng 1 phút`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
