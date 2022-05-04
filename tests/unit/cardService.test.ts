import { jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import cardService from '../../src/services/cardService.js';
import companyService from '../../src/services/companyService.js';
import employeeService from '../../src/services/employeeService.js';
import cardRepository from '../../src/repositories/cardRepository.js';
import employeeBodyFactory from '../factories/employeeBodyFactory.js';
import cardBodyFactory from '../factories/cardBodyFactory.js';

describe('Create Card', () => {
	it('should created card', async () => {
		const apiKey: string = 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0';
		const employeeId: number = faker.datatype.number();
		const type = 'restaurant';
		const employee = employeeBodyFactory();

		jest
			.spyOn(companyService, 'validateApiKeyOrFail')
			.mockResolvedValue();

		jest
			.spyOn(employeeService, 'getById')
			.mockResolvedValue(employee);

		jest
			.spyOn(cardRepository, 'findByTypeAndEmployeeId')
			.mockImplementation(() => null);

		jest
			.spyOn(cardRepository, 'insert')
			.mockResolvedValue();

		await cardService.create(apiKey, employeeId, type);

		expect(cardRepository.insert).toBeCalledTimes(1);
	});

	it('should conflict', async () => {
		const apiKey: string = 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0';
		const employeeId: number = faker.datatype.number();
		const type = 'restaurant';
		const employee = employeeBodyFactory();
		const card = cardBodyFactory();

		jest
			.spyOn(companyService, 'validateApiKeyOrFail')
			.mockResolvedValue();
		
		jest
			.spyOn(employeeService, 'getById')
			.mockResolvedValue(employee);
		
		jest
			.spyOn(cardRepository, 'findByTypeAndEmployeeId')
			.mockResolvedValue(card);

		expect(async () => {
			await cardService.create(apiKey, employeeId, type);
		}).rejects.toEqual({ type: 'conflict' });
	});
});

describe('Activate Card', () => {
	it.todo('shold activated card');
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
