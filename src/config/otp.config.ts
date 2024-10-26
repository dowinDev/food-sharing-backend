import { Injectable } from '@nestjs/common';
import randomatic from 'randomatic';

@Injectable()
export class OtpConfig {
  private otpStore = new Map<string, { otp: string; expiresAt: number }>();

  generateOTP(): string {
    return randomatic('0', 6); // OTP gồm 6 chữ số
  }

  saveOtp(email: string, otp: string): void {
    const expiresAt = Date.now() + 60 * 1000; // OTP hết hạn sau 1 phút
    this.otpStore.set(email, { otp, expiresAt });
  }

  verifyOtp(email: string, otp: string): boolean {
    const record = this.otpStore.get(email);
    if (!record) return false;

    const isExpired = Date.now() > record.expiresAt;
    const isValid = record.otp === otp && !isExpired;

    // Xóa OTP khỏi store sau khi xác thực để tránh dùng lại
    if (isValid || isExpired) {
      this.otpStore.delete(email);
    }
    return isValid;
  }

  resendOtp(email: string): string | null {
    const record = this.otpStore.get(email);

    // Cho phép gửi lại OTP nếu đã hết hạn
    if (!record || Date.now() > record.expiresAt) {
      const newOtp = this.generateOTP();
      this.saveOtp(email, newOtp);
      return newOtp;
    }
    return null;
  }
}
