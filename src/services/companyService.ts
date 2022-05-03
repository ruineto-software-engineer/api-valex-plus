import * as companyRepository from "../repositories/companyRepository.js";

export async function validateApiKeyOrFail(apiKey: string) {
  const company = await companyRepository.findByApiKey(apiKey);
  if (!company) {
    throw { type: "unauthorized" };
  }
}
