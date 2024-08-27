import {generatePassword} from './generate.password';

describe('generatePassword', () => {
  it('should generate a password of the specified length', () => {
    const length = 10;
    const password = generatePassword(length, 'low');
    expect(password).toHaveLength(length);
  });

  it('should generate a low-strength password with only lowercase letters', () => {
    const length = 12;
    const password = generatePassword(length, 'low');
    expect(password).toMatch(/^[a-z]+$/); // Only lowercase letters
    expect(password).toHaveLength(length);
  });

  it('should generate a medium-strength password with lowercase and uppercase letters', () => {
    const length = 12;
    const password = generatePassword(length, 'medium');
    expect(password).toMatch(/^[a-zA-Z]+$/); // Lowercase and uppercase letters
    expect(password).toMatch(/[a-z]/); // Contains at least one lowercase letter
    expect(password).toMatch(/[A-Z]/); // Contains at least one uppercase letter
    expect(password).toHaveLength(length);
  });

  it('should generate a high-strength password with lowercase, uppercase, numbers, and special characters', () => {
    const length = 12;
    const password = generatePassword(length, 'high');
    expect(password).toMatch(/^[a-zA-Z0-9!@#$%^&*()_+~`|}{[\]:;?><,./-=]+$/); // Lowercase, uppercase, numbers, special characters
    expect(password).toMatch(/[a-z]/); // Contains at least one lowercase letter
    expect(password).toMatch(/[A-Z]/); // Contains at least one uppercase letter
    expect(password).toMatch(/[0-9]/); // Contains at least one number
    expect(password).toMatch(/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/); // Contains at least one special character
    expect(password).toHaveLength(length);
  });

  it('should throw an error if length is less than 1', () => {
    expect(() => generatePassword(0, 'low')).toThrow('Password length must be at least 1');
  });

  it('should generate a high-strength password that includes at least one lowercase, one uppercase, one number, and one special character', () => {
    const length = 50;
    const password = generatePassword(length, 'high');
    expect(password).toMatch(/[a-z]/); // Contains at least one lowercase letter
    expect(password).toMatch(/[A-Z]/); // Contains at least one uppercase letter
    expect(password).toMatch(/[0-9]/); // Contains at least one number
    expect(password).toMatch(/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/); // Contains at least one special character
    expect(password).toHaveLength(length);
  });

  it('should shuffle the password characters, avoiding predictable patterns', () => {
    const length = 50;
    const password = generatePassword(length, 'high');
    const uniqueChars = new Set(password.split(''));
    expect(uniqueChars.size).toBeGreaterThan(1);
  });
});