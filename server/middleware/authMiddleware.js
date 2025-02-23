const User = require("../models/userModel.js")
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // to find user id
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select("password")  //-password

            next();
        }
        catch (err) {
            return res.status(401).json({ msg: "Not authorized, wrong token" })
        }

        if (!token) {
            return res.status(401).json({ msg: "Not authorized, No token" })
        }
    }
}

module.exports = { auth };