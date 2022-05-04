import * as employeeRepository from "../repositories/employeeRepository.js";

async function getById(id: number) {
  const employee = await employeeRepository.findById(id);
  if (!employee) {
    throw { type: "bad_request" };
  }

  return employee;
}

const employeeService = {
  getById
}

export default employeeService;