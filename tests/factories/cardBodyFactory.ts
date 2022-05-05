import { faker } from "@faker-js/faker";
import * as cardRepository from "../../src/repositories/cardRepository.js";

export default function employeeBodyFactory(): cardRepository.Card {
  return {
    id: faker.datatype.number(),
    employeeId: faker.datatype.number(),
    number: '345823414922202',
    cardholderName: 'FULANO P SILVA',
    securityCode: '123',
    expirationDate: '09/29',
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type: 'restaurant'
  };
}