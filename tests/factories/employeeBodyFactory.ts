import { faker } from "@faker-js/faker";
import * as employeeRepository from "../../src/repositories/employeeRepository.js";

export default function employeeBodyFactory(): employeeRepository.Employee {
  return {
    id: faker.datatype.number(),
    fullName: faker.name.findName(),
    cpf: faker.internet.password(),
    email: faker.internet.email(),
    companyId: faker.datatype.number(),
  };
}