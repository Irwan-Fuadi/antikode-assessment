"use script";

const jwt = require("jsonwebtoken");

module.exports = {
    decoderHS256: (req, res, next) => {
        try {


            if (!req.headers.authorization)
                return res.status(403).send({ authorization: false, message: 'Access Forbidden' })

            const token = req.headers.authorization;
            const SECRET_KEY = process.env.SECRET_KEY;

            const decode = jwt.verify(token, SECRET_KEY)

            if (!decode)
                return res.status(403).send({ authorization: false, message: 'Access Forbidden' })

            req.user_data = decode
            return next()
        } catch (error) {
            let message = "Expired token"
            return res.status(401).send({
                "data": null,
                message,
                "code": 401,
                "meta": {},
                "success": false,
                "status": {
                    "client_message": message,
                    "server_message": message
                }
            })
        }
    }
}