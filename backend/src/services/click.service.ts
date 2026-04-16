// Click
import { ClickRepository } from "../repositories/click.repository.js";

const clickRepository: ClickRepository = new ClickRepository();

export class ClickService {
  static async register(
    linkId: number,
    ip: string,
    userAgent: string
  ) {
    return clickRepository.create({
      link_id: linkId,
      ip_address: ip,
      user_agent: userAgent,
    });
  }
}