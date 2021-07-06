const database = require('../foundation/database.class');

class CommentModel {

    static create(content, postID, userID, res, callback) {
        sql = "insert into comments(content,postID,userID,modifyAt,isDeleted) value('" + content + "','" + postID + "','" + userID + "',Now(),'no');";
        database.insert(sql, (result) => {
            callback(result);
        });
    }

    static update(content, contentID, res, callback) {
        sql = "update comments set content = " + content + ", modifyAt = Now() where id = " + contentID + ";";
        database.update(sql, (result) => {
            callback(result);
        });
    }

    static delete(contentID, res, callback) {
        sql = "update comments set isDeleted = 'yes' , modifyAt = Now() where id = " + contentID + ";";
        database.update(sql, (result) => {
            callback(result);
        });
    }

    static getAll(fromRow, commentPerPage, res, callback) {
        sql = `select t1.postID ,t1.content, t1.modifyAt, t2.firstname, t2.lastname, 
         from comments t1 inner join users t2
         on t1.userID = t2.id 
         order by t1.modifyAt desc 
         where t1.isDeleted in('no','') 
         limit` + fromRow + `,` + commentPerPage + `;`;
        database.select(sql, (result) => {
            callback(result);
        });
    }
}

module.exports = CommentModel;