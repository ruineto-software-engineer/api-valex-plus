import faker from "@faker-js/faker";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import * as cardRepository from "../repositories/cardRepository.js";
import * as companyService from "../services/companyService.js";
import * as employeeService from "../services/employeeService.js";

export async function create(
  apiKey: string,
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  await companyService.validateApiKeyOrFail(apiKey);

  const employee = await employeeService.getById(employeeId);

  const existingCard = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );
  if (existingCard) {
    throw { type: "conflict" };
  }

  const cardData = generateCardData(employee.fullName);

  await cardRepository.insert({
    ...cardData,
    employeeId,
    isVirtual: false,
    isBlocked: false,
    type,
  });
}

function generateCardData(employeeName: string) {
  const number = faker.finance.creditCardNumber("mastercard");
  const cardholderName = formatCardholderName(employeeName);
  const expirationDate = dayjs().add(5, "year").format("MM/YY");

  const hashedSecurityCode = getHashedSecurityCode();

  return {
    number,
    cardholderName,
    securityCode: hashedSecurityCode,
    expirationDate,
  };
}

function getMiddleNameInitial(middleName: string) {
  return middleName[0];
}

function filterTwoLetterMiddleName(middleName: string) {
  if (middleName.length >= 3) return middleName;
}

function formatCardholderName(fullName: string) {
  const [firstName, ...otherNames] = fullName.split(" ");
  const lastName = otherNames.pop();
  const middleNames = otherNames
    .filter(filterTwoLetterMiddleName)
    .map(getMiddleNameInitial);

  if (middleNames.length > 0) {
    return [firstName, middleNames, lastName].join(" ").toUpperCase();
  }

  return [firstName, lastName].join(" ").toUpperCase();
}

function getHashedSecurityCode() {
  const securityCode = faker.finance.creditCardCVV();
  console.log(securityCode);

  return bcrypt.hashSync(securityCode, 8);
}

export async function activate(id: number, cvc: string, password: string) {
  const card = await getById(id);

  validateExpirationDateOrFail(card.expirationDate);
  validateCVCOrFail(cvc, card.securityCode);

  const isAlreadyActive = card.password;
  if (isAlreadyActive) {
    throw { type: "bad_request" };
  }

  const password4DigitFormat = /^d{4}$/;
  if (!password4DigitFormat.test(password)) {
    throw { type: "bad_request" };
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  await cardRepository.update(id, { password: hashedPassword });
}

export function validateExpirationDateOrFail(expirationDate: string) {
  const today = dayjs().format("MM/YY");
  if (dayjs(today).isAfter(dayjs(expirationDate))) {
    throw { type: "bad_request" };
  }
}

export async function getById(id: number) {
  const card = await cardRepository.findById(id);
  if (!card) {
    throw { type: "not_found" };
  }
  return card;
}

export function validateCVCOrFail(cvc: string, cardCVC: string) {
  const isCVCValid = bcrypt.compareSync(cvc, cardCVC);
  if (!isCVCValid) {
    throw { type: "unauthorized" };
  }
}

export function validatePasswordOrFail(password: string, cardPassword: string) {
  const isPasswordValid = bcrypt.compareSync(password, cardPassword);
  if (!isPasswordValid) {
    throw { type: "unauthorized" };
  }
}
