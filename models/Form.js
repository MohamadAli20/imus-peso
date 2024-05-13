const mysql = require('mysql');
const config = require('../config');

class Form{
    constructor(){
        this.connection = mysql.createConnection(config);
    }
    insert(info, callback){
        this.connection.query(
            'INSERT into personal_information(surname, firstname, middlename, suffix, birthdate, email, height, gender, civil_status, religion, address, employment_status, is_ofw, is_former_ofw, is_4ps_beneficiary, created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                info.personalInformation[0].value, // surname
                info.personalInformation[1].value, // first name
                info.personalInformation[2].value, // middle name
                info.personalInformation[3].value, // suffix
                info.personalInformation[4].value, // birthdate
                info.personalInformation[5].value, // email
                info.personalInformation[6].value, // contact
                info.personalInformation[7].value, // height
                info.personalInformation[8].value, // gender
                info.personalInformation[9].value, // civil_status
                info.personalInformation[10].value, // religion
                info.personalInformation[14] + " " + info.personalInformation[13] + " " + info.personalInformation[12] + " " + info.personalInformation[11],// address
                info.personalInformation[15].value, // employment_status
                // info.personalInformation[] // is_ofw, is_former_ofw, is_4ps_beneficiary, created_at
            ]
        )
    }
}

module.exports = new Form();