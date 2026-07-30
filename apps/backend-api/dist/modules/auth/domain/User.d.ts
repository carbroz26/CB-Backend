export declare class User {
    readonly id: string;
    readonly phoneNumber: string;
    isActive: boolean;
    failedAttempts: number;
    lockoutUntil: Date | null;
    readonly createdAt: Date;
    updatedAt: Date;
    constructor(id: string, phoneNumber: string, isActive: boolean, failedAttempts: number, lockoutUntil: Date | null, createdAt: Date, updatedAt: Date);
    incrementFailedAttempts(): void;
    resetFailedAttempts(): void;
    isLockedOut(): boolean;
}
