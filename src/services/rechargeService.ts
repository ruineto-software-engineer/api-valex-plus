import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cardService from "../services/cardService.js";
import * as companyService from "../services/companyService.js";

export async function recharge(apiKey: string, id: number, amount: number) {
  await companyService.validateApiKeyOrFail(apiKey);

  const card = await cardService.getById(id);
  cardService.validateExpirationDateOrFail(card.expirationDate);

  await rechargeRepository.insert({ cardId: id, amount });
}
