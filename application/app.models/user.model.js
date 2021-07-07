const database = require('../foundation/database.class');
const crypto = require('crypto');

class UserModel {
    static register(firstname, lastname, email, password, res, callback) {
        this.checkUniqueEmail(firstname, lastname, email, password, selectResult => {
            if (!selectResult.email) {
                let hashed = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
                let sql = "insert into users(firstname,lastname,email,password,isActive,createDate) values('" + firstname + "','" + lastname + "','" + email + "','" + hashed + "','yes',NOW());";
                database.insert(sql, (result) => { callback(result) });
            } else {
                res.json({ "data": "email already taken" });
            }
        });
    }

    static login(email, password, res, callback) {
        let hashed = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
        let sql = "select id from users where email = " + email + " password = " + hashed;
        database.select(sql, (result) => {
            if (!result.id) {
                res.json({ "data": "Incorrect email or password", "error": 1 });
            } else {
                callback(result);
            }
        });
    }

    static profile(userID, res, callback) {
        let sql = "select * from users where id=" + userID;
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