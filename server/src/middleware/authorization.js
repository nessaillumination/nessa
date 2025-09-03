import httpError from '../util/httpError.js';
import responseMessage from '../constant/responseMessage.js';

export default () => {
    return (req, _res, next) => {
        try {
            const user = req.authenticatedUser;

            if (!user) {
                return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 401);
            }

            next();
        } catch (error) {
            httpError(next, error, req, 500);
        }
    };
};
