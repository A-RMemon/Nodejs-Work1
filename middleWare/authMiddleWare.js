require('dotenv').config();
const jwt = require('jsonwebtoken')
const secret = process.env.jwtSecret;

exports.authMiddleware = async (req, res, next) => {
    try {

        let token = req.headers.authorization
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(400).json({ message: "unauthorized" });
            }
            console.log(decoded) // bar
            req._id = decoded._id
            next()
        });
   

    } catch (error) {
        console.log(error)
    }

}