const mysql2 = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

class Database {
    constructor() {
        this.connection = mysql2.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });
        this.connection.getConnection((err) => {
            if (err) {
                console.error('Error connecting database', err.stack);
                return;
            } else {
                console.log('Database Connected');
            }
        });
    }

    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    close() {
        this.connection.end();
    }
}

module.exports = new Database();
