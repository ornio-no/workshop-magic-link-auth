import UserDbModel from '../models/UserDb.model';
import { generateRandomToken } from '../utils/generateRandomToken';
import dayjs from 'dayjs';
import MagicLinkDbModel from '../models/MagicLinkDb.model';
import { MagicLinkStatusEnum } from '../interfaces/enums/MagicLinkStatus.enum';
import { jwtGenerateToken } from '../utils/jwt/jwtGenerateToken';

class AuthServiceBase {
    magicLink = async (email: string): Promise<string> => {
        try {
            const user = await UserDbModel.query()
                .findOne({ email })
                .throwIfNotFound({ message: 'E-mail does not exists' });

            const refId = generateRandomToken();
            const token = generateRandomToken();
            const expireAt = dayjs().add(1, 'hours');

            await MagicLinkDbModel.query().insert({
                token,
                ref_id: refId,
                expire_at: expireAt.toDate(),
                user_id: user.id
            });

            return refId;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    status = async (refId: string): Promise<string | object> => {
        try {
            const link = await MagicLinkDbModel.query()
                .findOne({ ref_id: refId })
                .withGraphFetched('user')
                .throwIfNotFound({ message: MagicLinkStatusEnum.NOT_FOUND });

            if (dayjs(link.expire_at) < dayjs()) {
                return { status: MagicLinkStatusEnum.EXPIRED };
            }

            if (link.confirmed_at !== null) {
                // Generate JWT
                const token = jwtGenerateToken(link.user);
                await link.$query().patch({ logged_at: new Date() });

                return { status: MagicLinkStatusEnum.CONFIRMED, token };
            }

            return { status: MagicLinkStatusEnum.PENDING_CONFIRMATION };
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    confirm = async (token: string): Promise<object> => {
        try {
            const link = await MagicLinkDbModel.query()
                .findOne({ token })
                .withGraphFetched('user')
                .throwIfNotFound({ message: MagicLinkStatusEnum.NOT_FOUND });

            if (dayjs(link.expire_at) < dayjs()) {
                return { status: MagicLinkStatusEnum.EXPIRED };
            }

            if (link.confirmed_at !== null) {
                return { status: MagicLinkStatusEnum.ALREADY_CONFIRMED };
            }

            await link.$query().patch({ confirmed_at: new Date() });

            return { status: MagicLinkStatusEnum.CONFIRMED };
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}

export const AuthService = new AuthServiceBase();
