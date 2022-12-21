import jwt, { Algorithm } from 'jsonwebtoken';
import UserDbModel from '../../models/UserDb.model';
import { API_URL } from '../../config/app';
import { JWT_ALGORITHM, JWT_EXPIRE_TIME, JWT_SECRET } from '../../config/jwt';

export const jwtGenerateToken = (user: UserDbModel): string => {
    const payload = {
        iss: API_URL,
        sub: user.id.toString()
    };

    return jwt.sign(payload, JWT_SECRET as string, {
        expiresIn: JWT_EXPIRE_TIME,
        algorithm: JWT_ALGORITHM as Algorithm
    });
};
