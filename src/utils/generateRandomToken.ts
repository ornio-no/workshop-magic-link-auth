import { randomBytes } from 'crypto';

export const generateRandomToken = (length = 12): string => {
    return randomBytes(length).toString('hex');
};
