import { jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import cardService from '../../src/services/cardService.js';
import companyService from '../../src/services/companyService.js';
import employeeService from '../../src/services/employeeService.js';
import cardRepository from '../../src/repositories/cardRepository.js';
import employeeBodyFactory from '../factories/employeeBodyFactory.js';
import cardBodyFactory from '../factories/cardBodyFactory.js';

describe('Create Card', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
	});

	it('should created card', async () => {
		const apiKey: string = 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0';
		const employeeId: number = faker.datatype.number();
		const type = 'restaurant';
		const employee = employeeBodyFactory();

		jest.spyOn(companyService, 'validateApiKeyOrFail').mockResolvedValue();
		jest.spyOn(employeeService, 'getById').mockResolvedValue(employee);
		jest.spyOn(cardRepository, 'findByTypeAndEmployeeId').mockImplementation(() => null);
		jest.spyOn(cardRepository, 'insert').mockResolvedValue();

		await cardService.create(apiKey, employeeId, type);
		expect(cardRepository.insert).toBeCalledTimes(1);
	});

	it('should card conflict', async () => {
		const apiKey: string = 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0';
		const employeeId: number = faker.datatype.number();
		const type = 'restaurant';
		const employee = employeeBodyFactory();
		const card = cardBodyFactory();

		jest.spyOn(companyService, 'validateApiKeyOrFail').mockResolvedValue();
		jest.spyOn(employeeService, 'getById').mockResolvedValue(employee);
		jest.spyOn(cardRepository, 'findByTypeAndEmployeeId').mockResolvedValue(card);

		expect(async () => {
			await cardService.create(apiKey, employeeId, type);
		}).rejects.toEqual({ type: 'conflict' });
	});
});

describe('Activate Card', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
	});

	it('shold activated card', async () => {
		const card = cardBodyFactory();
		const hashedPassword = 'HASHED_PASSWORD';

		jest.spyOn(cardRepository, 'findById').mockResolvedValue(card);
		jest.spyOn(cardService, 'validateExpirationDateOrFail').mockImplementationOnce(() => null);
		jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(() => true);
		jest.spyOn(bcrypt, 'hashSync').mockImplementationOnce(() => hashedPassword);
		jest.spyOn(cardRepository, 'update').mockResolvedValue();

		await cardService.activate(card.id, card.securityCode, 'dddd');
		expect(cardRepository.update).toBeCalledWith(card.id, { password: hashedPassword });
	});
});

describe('Expiration Date Card', () => {
	it.todo('shold expired card');
});

describe('Search Card', () => {
	it.todo('shold invalid card');
});

describe('CVV Card', () => {
	it.todo('shold invalid card CVV');
});

describe('Password Card', () => {
	it.todo('shold invalid card password');
});
