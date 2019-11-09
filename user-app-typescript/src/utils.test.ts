import { isValidEmail } from './utils';

describe('utils', () => {
  test('isValidEmail', () => {
    expect(isValidEmail('foo')).toStrictEqual(false);
    expect(isValidEmail('foo@bar')).toStrictEqual(true);
  });
});
