import { AuthRepository } from "../repositories/AuthRepository.js";
import { SendOtpDto, VerifyOtpDto } from "../dto/auth.dto.js";
import { User } from "../domain/User.js";
import crypto from "crypto";

export class AuthService {
  constructor(private authRepo: AuthRepository) {}

  async sendOtp(dto: SendOtpDto): Promise<{ message: string }> {
    let user = await this.authRepo.findUserByPhone(dto.phoneNumber);
    if (!user) {
      user = new User(
        crypto.randomUUID(),
        dto.phoneNumber,
        true,
        0,
        null,
        new Date(),
        new Date()
      );
    } else {
      if (user.isLockedOut()) {
        throw new Error("Account locked out due to multiple failed attempts.");
      }
    }
    await this.authRepo.saveUser(user);

    // Generate 6 digit OTP (mocked in prod to a real sms service)
    const otpCode = "123456"; 
    const codeHash = crypto.createHash("sha256").update(otpCode).digest("hex");
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await this.authRepo.createOtp(user.id, codeHash, expiresAt);

    return { message: "OTP sent successfully" };
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.authRepo.findUserByPhone(dto.phoneNumber);
    if (!user) throw new Error("User not found");
    if (user.isLockedOut()) throw new Error("Account locked out");

    const otpRecord = await this.authRepo.getLatestOtp(user.id);
    if (!otpRecord) throw new Error("No pending OTP");
    if (otpRecord.expiresAt < new Date()) throw new Error("OTP expired");

    const codeHash = crypto.createHash("sha256").update(dto.code).digest("hex");
    if (otpRecord.codeHash !== codeHash) {
      user.incrementFailedAttempts();
      await this.authRepo.saveUser(user);
      throw new Error("Invalid OTP");
    }

    user.resetFailedAttempts();
    await this.authRepo.saveUser(user);
    await this.authRepo.markOtpUsed(otpRecord.id);

    // Mock tokens
    return {
      accessToken: `mock_jwt_access_${user.id}`,
      refreshToken: `mock_jwt_refresh_${user.id}`,
    };
  }
}
