import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let deocdedData;

        if(token && isCustomAuth) {
            deocdedData = jwt.verify(token, 'test');

            req.userId = deocdedData?.id;
        } else {
            deocdedData = jwt.decode(token);
            req.userId = deocdedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;
