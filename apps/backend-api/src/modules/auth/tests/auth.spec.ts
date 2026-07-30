import { User } from "../domain/User.js";

describe("User Domain", () => {
  it("should increment failed attempts and lockout", () => {
    const user = new User("1", "+1234567890", true, 0, null, new Date(), new Date());
    for(let i=0; i<5; i++) {
      user.incrementFailedAttempts();
    }
    expect(user.failedAttempts).toBe(5);
    expect(user.isLockedOut()).toBe(true);
  });
});
