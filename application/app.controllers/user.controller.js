const UserModel = require('../app.models/user.model');
const JsonWebToken = require('../foundation/JWT.class');

class UserController {

    static register(req, res) {
        let data = req.body;
        console.log("request body : " + JSON.stringify(req.body));
        UserModel.register(res, data, (result) => {
            console.log("result : ", result);
            res.json(result);
        });
    }

    static login(req, res) {
        let data = req.body;
        UserModel.login(res, data, (result) => {
            let token = JsonWebToken.createToken(result.id);
            let respondJSON = { "data": { "token": token }, "error": 0 };
            res.json(respondJSON);
        });
    }

    static profile(req, res) {
        UserModel.profile(res, req, (result) => {
            res.json({ "data": result, "error": 0 });
        });
    }
}

module.exports = UserController;