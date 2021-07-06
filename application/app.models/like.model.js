const database = require('../foundation/database.class');

class LikeModel {

    static like(userID, typeID, res, type, callback) {
        if (type === "comment") {
            var sql = "insert into likes(userID,commentID) values('" + userID + "','" + typeID + "');";
        } else if (type === "post") {
            var sql = "insert into likes(userID,postID) values('" + userID + "','" + typeID + "');";
        }
        database.insert(sql, result => {});
    }

    static unlike(type, userID, typeID, res, type, callback) {
        this.getLikeID(type, userID, typeID, selectResult => {
            let sql = "delete from likes where id =" + selectResult.id;
            database.delete(sql, result => {
                callback(result);
            });
        })
    }


    static totalLike(typeID, type, res, callback) {
        if (type === "post") {
            var sql = "select count(id) from likes where postID = " + typeID + ";";
        } else if (type === "comment") {
            var sql = "select count(id) from likes where commentID = " + typeID + ";";
        }
        database.insert(sql, result => {
            callback(result);
        });
    }

    static likeBy(type, typeID, res, callback) {
        if (type === "post") {
            var sql = `select t3.firstname, t3.lastname from posts t1 
            inner join likes t2 on t1.id = t2.postID
            inner join users t3 0n t3.id = t2.userID
            where t1.id = ` + typeID + `
            order by t3.firstname, t3.lastname;`;
        } else if (type === "comment") {
            var sql = `select t3.firstname, t3.lastname  from comments t1 
            inner join likes t2 on t1.id = t2.commentID
            inner join users t3 0n t3.id = t2.userID
            where t1.id = ` + typeID + `
            order by t3.firstname, t3.lastname;`;
        }
        database.select(sql, result => {
            callback(result);
        });
    }

    getLikeID(type, userID, typeID, callback) {
        if (type === "comment") {
            var sql = "select id from likes where userID = '" + userID + "' and commentID'" + typeID + "';";
        } else if (type === "post") {
            var sql = "select id from likes where userID = '" + userID + "' and postID'" + typeID + "';";
        }
        database.select(sql, result => {
            callback(result);
        });
    }
}

module.exports = LikeModel;