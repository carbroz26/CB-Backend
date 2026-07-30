export class User {
    id;
    phoneNumber;
    isActive;
    failedAttempts;
    lockoutUntil;
    createdAt;
    updatedAt;
    constructor(id, phoneNumber, isActive, failedAttempts, lockoutUntil, createdAt, updatedAt) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.isActive = isActive;
        this.failedAttempts = failedAttempts;
        this.lockoutUntil = lockoutUntil;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    incrementFailedAttempts() {
        this.failedAttempts += 1;
        if (this.failedAttempts >= 5) {
            this.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
        }
    }
    resetFailedAttempts() {
        this.failedAttempts = 0;
        this.lockoutUntil = null;
    }
    isLockedOut() {
        if (!this.lockoutUntil)
            return false;
        return this.lockoutUntil > new Date();
    }
}
//# sourceMappingURL=User.js.map