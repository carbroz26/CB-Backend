export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async sendOtp(req, reply) {
        try {
            const response = await this.authService.sendOtp(req.body);
            return reply.code(200).send(response);
        }
        catch (err) {
            return reply.code(400).send({ error: err.message });
        }
    }
    async verifyOtp(req, reply) {
        try {
            const tokens = await this.authService.verifyOtp(req.body);
            return reply.code(200).send(tokens);
        }
        catch (err) {
            return reply.code(401).send({ error: err.message });
        }
    }
}
//# sourceMappingURL=AuthController.js.map