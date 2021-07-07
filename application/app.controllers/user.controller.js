const UserModel = require('../app.models/user.model');
const JsonWebToken = require('../foundation/JWT.class');

class UserController {

    static register(req, res) {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let password = req.body.password;
        console.log("request body : " + JSON.stringify(req.body));
        UserModel.register(firstname, lastname, email, password, res, (result) => {
            console.log("result : ", result);
            res.json(result);
        });
    }

    static login(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        UserModel.login(email, password, res, (result) => {
            let token = JsonWebToken.createToken(result.id);
            let respondJSON = { "data": { "token": token }, "error": 0 };
            res.json(respondJSON);
        });
    }

    static profile(req, res) {
        let userID = req.userID;;
        UserModel.profile(userID, res, (result) => {
            res.json({ "data": result, "error": 0 });
        });
    }
}

module.exports = UserController;