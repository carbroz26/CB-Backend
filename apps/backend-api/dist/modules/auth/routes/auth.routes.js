import { AuthController } from "../controllers/AuthController.js";
import { AuthService } from "../services/AuthService.js";
import { AuthRepository } from "../repositories/AuthRepository.js";
import { PrismaClient } from "@prisma/client";
import { sendOtpSchema, verifyOtpSchema } from "@carbroz/validation";
const prisma = new PrismaClient();
const authRepo = new AuthRepository(prisma);
const authService = new AuthService(authRepo);
const authController = new AuthController(authService);
export async function authRoutes(fastify) {
    fastify.post("/auth/send-otp", {
        schema: {
            body: sendOtpSchema,
        },
        handler: authController.sendOtp.bind(authController)
    });
    fastify.post("/auth/verify-otp", {
        schema: {
            body: verifyOtpSchema,
        },
        handler: authController.verifyOtp.bind(authController)
    });
}
//# sourceMappingURL=auth.routes.js.map