export interface SendOtpRequest {
    phoneNumber: string;
}
export interface VerifyOtpRequest {
    phoneNumber: string;
    code: string;
    deviceFingerprint: string;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface AuthSession {
    sessionId: string;
    userId: string;
    deviceFingerprint: string;
}
