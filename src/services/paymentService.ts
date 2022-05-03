import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as businessService from "../services/businessService.js";
import * as cardService from "../services/cardService.js";
import { sumTransactionWithAmount } from "./transactionService.js";

export async function payment(
  id: number,
  password: string,
  businessId: number,
  amount: number
) {
  const card = await cardService.getById(id);
  cardService.validateExpirationDateOrFail(card.expirationDate);
  cardService.validatePasswordOrFail(password, card.password);

  const business = await businessService.getById(id);

  if (card.type !== business.type) {
    throw { type: "bad_request" };
  }

  const payments = await paymentRepository.findByCardId(id);
  const recharges = await rechargeRepository.findByCardId(id);

  const cardAmount = getCardAmount(payments, recharges);
  if (cardAmount < amount) {
    throw { type: "bad_request" };
  }

  await paymentRepository.insert({ cardId: id, businessId, amount });
}

function getCardAmount(
  payments: paymentRepository.PaymentWithBusinessName[],
  recharges: rechargeRepository.Recharge[]
) {
  const totalPaymentAmount = payments.reduce(sumTransactionWithAmount, 0);
  const totalRechargeAmount = recharges.reduce(sumTransactionWithAmount, 0);
  return totalRechargeAmount - totalPaymentAmount;
}
