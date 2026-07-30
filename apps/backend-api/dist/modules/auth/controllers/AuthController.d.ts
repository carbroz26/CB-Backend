import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/AuthService.js";
import { SendOtpDto, VerifyOtpDto } from "../dto/auth.dto.js";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    sendOtp(req: FastifyRequest<{
        Body: SendOtpDto;
    }>, reply: FastifyReply): Promise<never>;
    verifyOtp(req: FastifyRequest<{
        Body: VerifyOtpDto;
    }>, reply: FastifyReply): Promise<never>;
}
