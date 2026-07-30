export class User {
  constructor(
    public readonly id: string,
    public readonly phoneNumber: string,
    public isActive: boolean,
    public failedAttempts: number,
    public lockoutUntil: Date | null,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}

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

  isLockedOut(): boolean {
    if (!this.lockoutUntil) return false;
    return this.lockoutUntil > new Date();
  }
}
