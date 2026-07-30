import { z } from "zod";

const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

export const sendOtpSchema = z.object({
  phoneNumber: z.string().regex(phoneNumberRegex, "Invalid phone number format"),
});

export const verifyOtpSchema = z.object({
  phoneNumber: z.string().regex(phoneNumberRegex, "Invalid phone number format"),
  code: z.string().length(6, "OTP must be exactly 6 characters"),
  deviceFingerprint: z.string().min(1, "Device fingerprint is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
