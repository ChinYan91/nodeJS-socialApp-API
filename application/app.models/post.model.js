const database = require('../foundation/database.class');

class PostModel {

    static getAll(fromRow, postPerPage, res, callback) {
        sql = `select t1.title ,t1.content, t1.modifyAt, t2.firstname, t2.lastname, 
         from posts t1 inner join users t2
         on t1.userID = t2.id 
         order by t1.modifyAt desc 
         where t1.isDeleted in('no','') 
         limit` + fromRow + `,` + postPerPage + `;`;
        database.select(sql, (result) => {
            callback(result);
        });
    }

    static create(title, content, userID, res, callback) {
        sql = "insert into posts(title,content,userID,modifyAt,isDeleted) value('" + title + "','" + content + "','" + userID + "',Now(),'no');";
        database.insert(sql, (result) => {
            callback(result);
        });
    }

    static update(title, content, contentID, res, callback) {
        sql = "update posts set title = '" + title + "'  content = '" + content + "', modifyAt = Now() where id = " + contentID + ";";
        database.update(sql, (result) => {
            callback(result);
        });
    }

    static delete(contentID, res, callback) {
        sql = "update posts set isDeleted = 'yes' , modifyAt = Now() where id = " + contentID + ";";
        database.update(sql, (result) => {
            callback(result);
        });
    }
}

module.exports = PostModel;