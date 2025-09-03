import quicker from '../util/quicker.js';
import config from '../config/config.js';
import databaseService from '../service/databaseService.js';
import httpError from '../util/httpError.js';
import responseMessage from '../constant/responseMessage.js';
import { allowedUsers } from '../constant/application.js';

export default async (req, _res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (token) {
            const { email } = quicker.verifyToken(token, config.ACCESS_TOKEN.SECRET);
            
            const user = allowedUsers.find((user) => user.email === email);
            
            if (!user) {
                return httpError(next, new Error(responseMessage.INVALID_CREDENTIALS), req, 401);
            }

            if (user) {
                req.authenticatedUser = user.email;
                return next();
            }
        }

        return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 401);
    } catch (err) {
        return httpError(next, err, req, 500);
    }
};
