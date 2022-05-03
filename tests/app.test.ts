import { jest } from '@jest/globals';
import * as cardService from '../src/services/cardService.js';

describe('Create Card', () => {
  it.todo("shold existing card return 409");
  it.todo("shold valid body return 201");
});

describe('Activate Card', () => {
  it.todo("shold activated card return 400");
  it.todo("shold invalid password return 400");
  it.todo("shold valid body return 200");
});

describe('Expiration Date Card', () => {
  it.todo("shold expired card return 400");
});

describe('Search Card', () => {
  it.todo("shold invalid card id return 404");
});

describe('CVV Card', () => {
  it.todo("shold invalid card CVV return 401");
});

describe('Password Card', () => {
  it.todo("shold invalid card password return 401");
});
