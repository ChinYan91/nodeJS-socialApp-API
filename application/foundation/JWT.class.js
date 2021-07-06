const JWT = require("jsonwebtoken");
const config = require("./config.json");

class JsonWebToken {
    static createToken(userID) {
        let secret = config.JWT.secret;
        let token = JWT.sign(userID, secret, { expiresIn: '3600s' });
        return token;
    }

    //middleware
    static auth(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            return res.sendStatus(401);
        } else {
            let secret = config.JWT.secret;
            JWT.verify(token, secret, (err, userID) => {
                console.log(err)
                if (err) {
                    return res.sendStatus(403);
                } else {
                    req.userID = userID;
                    next();
                }
            });
        }
    }
}

module.exports = JsonWebToken;