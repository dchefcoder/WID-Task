import { randomBytes } from 'crypto';

// Function to get the character set based on the strength level
const getCharacterSet = (strength: 'low' | 'medium' | 'high'): { chars: string, requiredSets: string[] } => {
    const lowLvlChars = 'abcdefghijklmnopqrstuvwxyz';
    const mediumLvlChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const highLvlChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';

    switch (strength) {
        case 'low':
            return { chars: lowLvlChars, requiredSets: [lowLvlChars] };
        case 'medium':
            return { chars: mediumLvlChars, requiredSets: [lowLvlChars, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'] };
        case 'high':
            return { chars: highLvlChars, requiredSets: [lowLvlChars, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '!@#$%^&*()_+~`|}{[]:;?><,./-='] };
        default:
            throw new Error('Invalid strength level');
    }
};

// Function to ensure at least one character from each required set is included
const generateRequiredCharacters = (requiredSets: string[]): string[] => {
    return requiredSets.map(set => set[randomBytes(1)[0] % set.length]);
};

// Function to generate random characters
const generateRandomCharacters = (length: number, chars: string): string[] => {
    return Array.from(randomBytes(length)).map(byte => chars[byte % chars.length]);
};

// Function to shuffle an array
const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randomBytes(1)[0] % (i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Main password generation function
export const generatePassword = (length: number, strength: 'low' | 'medium' | 'high'): string => {
    if (length < 1) {
        throw new Error('Password length must be at least 1');
    }

    const { chars, requiredSets } = getCharacterSet(strength);
    let passwordArray = generateRequiredCharacters(requiredSets);
    passwordArray = passwordArray.concat(generateRandomCharacters(length - passwordArray.length, chars));
    passwordArray = shuffleArray(passwordArray);

    return passwordArray.join('');
};
console.log(generatePassword(12,'high'))