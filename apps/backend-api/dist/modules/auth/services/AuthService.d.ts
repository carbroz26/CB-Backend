import { AuthRepository } from "../repositories/AuthRepository.js";
import { SendOtpDto, VerifyOtpDto } from "../dto/auth.dto.js";
export declare class AuthService {
    private authRepo;
    constructor(authRepo: AuthRepository);
    sendOtp(dto: SendOtpDto): Promise<{
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
