const database = require('../foundation/database.class');
const crypto = require('crypto');

class UserModel {
    static register(res, data, callback) {
        this.checkUniqueEmail(data, selectResult => {
            if (!selectResult.email) {
                let hashed = crypto.pbkdf2Sync(data.password, this.salt, 1000, 64, `sha512`).toString(`hex`);
                let sql = "insert into users(firstname,lastname,email,password,isActive,createDate) values('" + data.firstname + "','" + data.lastname + "','" + data.email + "','" + hashed + "','yes',NOW());";
                database.insert(sql, (result) => { callback(result) });
            } else {
                res.json({ "data": "email already taken" });
            }
        });
    }

    static login(res, data, callback) {
        let hashed = crypto.pbkdf2Sync(data.password, this.salt, 1000, 64, `sha512`).toString(`hex`);
        let sql = "select id from users where email = " + data.res + " password = " + hashed;
        database.select(sql, (result) => {
            if (!result.id) {
                res.json({ "data": "Incorrect email or password", "error": 1 });
            } else {
                callback(result);
            }
        });
    }

    static profile(res, req, callback) {
        let sql = "select * from users where id=" + req.userID;
        database.select(sql, (result) => {
            callback(result);
        });
    }

    checkUniqueEmail(data, callback) {
        sql = "select id from users where email = " + data.email + ";";
        database.select(sql, (result) => { callback(result) });
    }
}

module.exports = UserModel;