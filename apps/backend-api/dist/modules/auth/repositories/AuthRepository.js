import { User } from "../domain/User.js";
export class AuthRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUserByPhone(phoneNumber) {
        const data = await this.prisma.user.findUnique({ where: { phoneNumber } });
        if (!data)
            return null;
        return new User(data.id, data.phoneNumber, data.isActive, data.failedAttempts, data.lockoutUntil, data.createdAt, data.updatedAt);
    }
    async saveUser(user) {
        await this.prisma.user.upsert({
            where: { id: user.id },
            update: {
                phoneNumber: user.phoneNumber,
                isActive: user.isActive,
                failedAttempts: user.failedAttempts,
                lockoutUntil: user.lockoutUntil,
                updatedAt: new Date()
            },
            create: {
                id: user.id,
                phoneNumber: user.phoneNumber,
                isActive: user.isActive,
                failedAttempts: user.failedAttempts,
                lockoutUntil: user.lockoutUntil,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    }
    async createOtp(userId, codeHash, expiresAt) {
        await this.prisma.oTP.create({
            data: {
                userId,
                codeHash,
                expiresAt,
                isUsed: false
            }
        });
    }
    async getLatestOtp(userId) {
        return this.prisma.oTP.findFirst({
            where: { userId, isUsed: false },
            orderBy: { createdAt: "desc" }
        });
    }
    async markOtpUsed(id) {
        await this.prisma.oTP.update({
            where: { id },
            data: { isUsed: true }
        });
    }
}
//# sourceMappingURL=AuthRepository.js.map