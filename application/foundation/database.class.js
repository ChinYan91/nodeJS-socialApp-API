const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const config = require('./config.json');

class Database {
    constructor() { this.createConnection(); }

    createConnection() {
        let hostname = config.Database.hostname;
        let username = config.Database.username;
        let password = config.Database.password;
        let database = config.Database.database;
        let port = config.Database.port;

        const path = 'mysql://' + password + ':' + username + '@' + hostname + ':' + port + '/' + database;
        this.sequelize = new Sequelize(path, {
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

    }

    testConnection() {
        this.sequelize.authenticate().then(() => {
            console.log('Connection established successfully.');
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
        }).finally(() => {
            //this.sequelize.close();
        });
    }

    select(sql, callback) {
        this.sequelize.authenticate().then(async() => {
            let result = await this.sequelize.query(sql, { type: QueryTypes.SELECT });
            callback(result);
        });
    }

    insert(sql, callback) {
        this.sequelize.authenticate().then(async() => {
            let result = await this.sequelize.query(sql, { type: QueryTypes.INSERT });
            callback(result);
        });
    }

    update(sql, callback) {
        this.sequelize.authenticate().then(async() => {
            let result = await this.sequelize.query(sql, { type: QueryTypes.UPDATE });
            callback(result);
        });
    }

    delete(sql, callback) {
        this.sequelize.authenticate().then(async() => {
            let result = await this.sequelize.query(sql, { type: QueryTypes.DELETE });
            callback(result);
        });
    }
}

const database = new Database();

module.exports = database;