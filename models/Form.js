const mysql = require('mysql');
const config = require('../config');

class Form{
    constructor(){
        this.connection = mysql.createConnection(config);
    }
    /* Insert information to the database */
    insert(info, callback){
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        /* personal information */
        this.connection.query(
            'INSERT INTO personal_information(surname, firstname, middlename, suffix, birthdate, email, contact, height, gender, civil_status, disability, religion, address, employment_status, is_ofw, is_former_ofw, is_4ps_beneficiary, created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
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
                info.personalInformation[10].value, // disability
                info.personalInformation[11].value, // religion
                info.personalInformation[12].value, // address
                info.personalInformation[13].value, // employment_status
                info.personalInformation[14].value, // is_ofw
                info.personalInformation[15].value, // is_former_ofw
                info.personalInformation[16].value, // is_4ps_beneficiary
                today // created_at
            ],
            (error) => {
                if(error){
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        )
        /* job preference */
        this.connection.query(
            'INSERT INTO job_preference(preferred_occupation, occupation, preferred_work_occupation, work_occupation, created_at) VALUES(?,?,?,?,?)',
            [
                info.jobPreference[0].value, // preferred_occupation
                info.jobPreference[1].value, // occupation
                info.jobPreference[2].value, // preferred_work_occupation
                info.jobPreference[3].value, // work_occupation
                today // created_at
            ],
            (error) => {
                if(error){
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        )
        /* language and dialect proficiency */
        this.connection.query(
            'INSERT INTO language_dialect_proficiency(language1, language2, language3, other_language, created_at) VALUES(?,?,?,?,?)',
            [
                info.languageDialectProficiency[0].value, // language1
                info.languageDialectProficiency[1].value, // language2
                info.languageDialectProficiency[2].value, // language3
                info.languageDialectProficiency[3].value, // other language
                today // created_at
            ],
            (error) => {
                if(error){
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        )
        /* educational background */
        this.connection.query(
            'INSERT INTO educationaL_background(elementary_school, elementary_course, elementary_year_graduated, if_elementary_undergraduate, secondary_school, secondary_course, secondary_year_graduated, if_secondary_undergraduate, tertiary_school, tertiary_course, tertiary_year_graduated, if_tertiary_undergraduate, graduate_studies_school, graduate_studies_course, gradudate_studies_year_attended, if_graduate_studies_undergraduate, created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                info.educationalBackground[0].value, // elementary_school
                info.educationalBackground[1].value, // elementary_course
                info.educationalBackground[2].value, // elementary_year_graduated
                info.educationalBackground[3].value, // if_elementary_undergraduate
                info.educationalBackground[4].value, // secondary_school
                info.educationalBackground[5].value, // secondary_school
                info.educationalBackground[6].value, // secondary_year_graduated
                info.educationalBackground[7].value, // if_secondary_undergraduate
                info.educationalBackground[8].value, // tertiary_school
                info.educationalBackground[9].value, // tertiary_school
                info.educationalBackground[10].value, // tertiary_year_graduated
                info.educationalBackground[11].value, // if_tertiary_undergraduate
                info.educationalBackground[12].value, // graduate_studies_school
                info.educationalBackground[13].value, // graduate_studies_school
                info.educationalBackground[14].value, // graduate_studies_year_graduated
                info.educationalBackground[15].value, // if_graduate_studies_undergraduate
                today // created_at
            ],
            (error) => {
                if(error){
                    console.error(error);
                    callback(error);
                    return;
                }
            }
        )
        /* technical vocational training */
        
    }
}

module.exports = new Form();