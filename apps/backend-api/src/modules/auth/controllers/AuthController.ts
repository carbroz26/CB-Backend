import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/AuthService.js";
import { SendOtpDto, VerifyOtpDto } from "../dto/auth.dto.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  async sendOtp(req: FastifyRequest<{ Body: SendOtpDto }>, reply: FastifyReply) {
    try {
      const response = await this.authService.sendOtp(req.body);
      return reply.code(200).send(response);
    } catch (err: any) {
      return reply.code(400).send({ error: err.message });
    }
  }

  async verifyOtp(req: FastifyRequest<{ Body: VerifyOtpDto }>, reply: FastifyReply) {
    try {
      const tokens = await this.authService.verifyOtp(req.body);
      return reply.code(200).send(tokens);
    } catch (err: any) {
      return reply.code(401).send({ error: err.message });
    }
  }
}
