const mysql = require('mysql');
const bcrypt = require("bcryptjs");
const config = require('../config');

class User{
    constructor(){
        this.connection = mysql.createConnection(config);
    }
    count_account(callback){
        this.connection.query("SELECT COUNT(*) as total FROM users",
        (error, row) => {
            if(error){
                console.error(error);
                callback(error, null);
                return;
            }
            if(row){
                console.log(row);
                callback(null, row[0].total)
            }
        });
    }
    register_account(account_info, callback){
        let is_admin = 0;
        this.count_account((error, totalCount) => {
            if(error){
                console.error(error);
                return callback(error);
            }
            if(totalCount === 0){
                is_admin = 1;
            }
            this.verify_account(account_info, (error, verified, information) => {
                console.log(information)
                if(error){
                    console.error(error);
                    return;
                }
                if(information === false){
                    /*hashing password*/
                    const passwordHash = bcrypt.hashSync(account_info.password, 10);
                    /*get current date and time*/
                    const date = new Date();
                    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

                    this.connection.query(
                        'INSERT INTO users(username, email, is_admin, password, created_at) VALUES(?,?,?,?,?)', 
                        [
                            account_info.username,
                            account_info.email,
                            is_admin,
                            passwordHash,
                            today
                        ],
                        (error) => {
                            if(error){
                                console.error(error);
                                callback(error);
                                return;
                            }
                            callback(false);
                        });
                }
                else{
                    callback(true);
                }
            });
        });
    }
    verify_account(credentials, callback){
        this.connection.query(
            "SELECT * FROM users WHERE email = ?",
            [ credentials.email ],
            (error, row) => {
                console.log(row);
                let verified = false;
                if(error){
                    console.error(error);
                    callback(error, null);
                    return;
                }
                if(row.length !== 0){
                    verified = bcrypt.compareSync(credentials.password, row[0].password);
                    const information = {
                        username: row[0].username,
                        email: row[0].email
                    }
                    callback(null, verified, information);
                }
                else{
                    callback(null, verified, false);
                }
            }
        );
    }
}

module.exports = new User();