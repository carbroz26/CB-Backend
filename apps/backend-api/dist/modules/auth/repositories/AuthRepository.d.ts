import { PrismaClient } from "@prisma/client";
import { User } from "../domain/User.js";
export declare class AuthRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findUserByPhone(phoneNumber: string): Promise<User | null>;
    saveUser(user: User): Promise<void>;
    createOtp(userId: string, codeHash: string, expiresAt: Date): Promise<void>;
    getLatestOtp(userId: string): Promise<any>;
    markOtpUsed(id: string): Promise<void>;
}
