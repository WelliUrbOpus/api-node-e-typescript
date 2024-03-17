import * as jwt from 'jsonwebtoken';



interface IJwtData {
    uid: number;
}


const sign = async (data: IJwtData): Promise<string | 'JTW_SECRET_NOT_FOUND'> => {
    if (!process.env.JWT_SECRET) return 'JTW_SECRET_NOT_FOUND';


    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '12h' });
};


const verify = async (token: string): Promise<IJwtData | 'JTW_SECRET_NOT_FOUND' | 'INVALID_TOKEN'> => {
    if (!process.env.JWT_SECRET) return 'JTW_SECRET_NOT_FOUND';

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'string') {
            return 'INVALID_TOKEN';
        }

        return decoded as IJwtData;

    } catch (error) {
        return 'INVALID_TOKEN';
    }


};

export const JWTService = {
    sign,
    verify,
};