const modelForm = require("../models/Form");
const model = require("../models/User"); /* move the controller methods to Form model */
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { jsPDF } = require("jspdf");

class Forms{
    add(req, res){
        modelForm.insert(req.body, (error) => {
            if(error){
                console.error(error);
            }
        })
    }
    /* For admin */
    admin_form(req, res){
        const id = req.params.id;
        model.get_application_by_id(id, (error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                console.log(row);
                res.render('admin_form', { row });
            }
        })
    }
    search(req, res){
        let name = req.params.name;
        model.get_application_by_name(name, (error, row) =>{
            if(error){
                console.error(error);
            }
            if(row){
                res.json(row);
            }
        })
    }
    delete(req, res){
        let id = req.params.id;
        model.delete_application_by_id(id, (error, result) => {
            if(error, result){
                console.error(error);
            }
            if(result){
                res.send("Successfully deleted");
            }
        });
    }
    count_form(req, res){
        model.count_application((error, total) => {
            if(error){
                console.error(error);
            }
            if(total){
                let val = total[0].total;
                res.json({"total": val});
            }
        })
    }
    count_male(req, res){
        modelForm.get_all_male((error, total) => {
            if(error){
                console.error(error);
            }
            if(total){
                let val = total[0].total
                res.json({"total_male": val})
            }
        })
    }
    count_female(req, res){
        modelForm.get_all_female((error, total) => {
            if(error){
                console.error(error);
            }
            if(total){
                let val = total[0].total
                res.json({"total_female": val})
            }
        })
    }
    get_top_five_occupation(req, res){
        modelForm.select_top_five_occupation((error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                res.json({"occupation": result})
            }
        })
    }
    get_top_five_location(req, res){
        modelForm.select_top_five_location((error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                res.json({"location": result})
            }
        })
    }
    get_top_unemployed(req, res){
        modelForm.select_top_unemployed((error, result) => {
            if(error){
                console.error(error);
            }
            if(result){
                res.json({"unemployed": result})
            }
        })
    }
    retrieve_application_by_id(req, res){
        const id = req.params.id;
        // console.log(id);
        model.get_application_by_id(id, (error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                res.json(row);
            }
        })
    }
    download_form(req, res){
        const id = req.params.id;

        model.get_application_by_id(id, (error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                let { surname, firstname, middlename, suffix, birthdate, email, contact, height, gender, civil_status, disability, religion, address, employment_status, is_ofw, is_former_ofw, is_4ps_beneficiary, preferred_occupation, occupation, preferred_work_occupation, work_occupation, language1, language2, language3, other_language, elementary_school, elementary_course, elementary_year_graduated, if_elementary_undergraduate, secondary_school, secondary_course, secondary_year_graduated, if_secondary_undergraduate, tertiary_school, tertiary_course, tertiary_year_graduated, if_tertiary_undergraduate, graduate_studies_school, graduate_studies_course, gradudate_studies_year_attended, if_graduate_studies_undergraduate, course, institution, date_from, date_to, certificate, eligibility, rating, date_exam, professional_license, valid_until, company_name, company_address, position, inclusive_date, status, skills } = row[0];
                suffix = suffix.toLowerCase() === "na" ? "" : suffix;
                
                if(suffix.toLowerCase() === "na"){
                    suffix = "";
                }
                if(disability === '{}' || disability === "") {
                    disability = "NA";
                }
                else{
                    disability = Object.values(JSON.parse(disability)).join(', ');
                }
                if(address !== '{}' && address !== "") {
                    const obj = JSON.parse(address);
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (!obj[key] || obj[key].trim() === '') {
                                obj[key] = "NA";
                            }
                        }
                    }
                    address = Object.values(obj).join(', ');
                }
                // Create a new PDF document
                const doc = new PDFDocument();
                const margin = 40;

                // Add border around content
                const startX = margin;
                const startY = margin; // Adjusted for the title height
                const width = 530;
                const borderHeight = 710;
                doc.rect(startX, startY, width, borderHeight);
                
                const toCapitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

                
                // Write content to PDF
                doc.fontSize(18).text(`${firstname} ${middlename} ${surname} ${suffix}`, 50, 50);
                let content = `PERSONAL INFORMATION\n\nBirthdate: ${birthdate}\nEmail: ${email}\nContact: ${contact}\nHeight: ${height}\nGender: ${gender}\nCivil Status: ${civil_status}\nDisability: ${disability}\nReligion: ${religion}\nAddress: ${address}`;
                

                
                // employment_status, is_ofw, is_former_ofw, is_4ps_beneficiary, preferred_occupation, occupation, preferred_work_occupation, work_occupation, language1, language2, language3, other_language, elementary_school, elementary_course, elementary_year_graduated, if_elementary_undergraduate, secondary_school, secondary_course, secondary_year_graduated, if_secondary_undergraduate, tertiary_school, tertiary_course, tertiary_year_graduated, if_tertiary_undergraduate, graduate_studies_school, graduate_studies_course, gradudate_studies_year_attended, if_graduate_studies_undergraduate, course, institution, date_from, date_to, certificate, eligibility, rating, date_exam, professional_license, valid_until, company_name, company_address, position, inclusive_date, status, skills } = row[0];
                employment_status = JSON.parse(employment_status);
                content += `\n\nEMPLOYMENT STATUS / TYPE\n\nEmployment Status: ${employment_status.employment_status}`
                if(employment_status.hasOwnProperty("how_long_looking_for_work")) {
                    content += `\nHow long have you been looking for work? ${employment_status["how_long_looking_for_work"]}`;
                }
                if(employment_status.hasOwnProperty("unemployed_type")){
                    content += `\nUnemployed type: ${employment_status["unemployed_type"]}`;
                }

                doc.fontSize(12).text(content, 50, 90);

                // doc.moveTo(40, 130).lineTo(570, 130).stroke();
                // doc.fontSize(14).text("------------------------------------------------------------", 50, 135);
                // doc.fontSize(14).text("SURNAME", 50, 135);
                // doc.fontSize(14).text("FIRST NAME", 215, 135);
                // doc.fontSize(14).text("MIDDLE NAME", 415, 135);
                // doc.fontSize(14).text("SUFFIX", 500, 135);

                // let content = `${firstname} ${middlename} ${surname} ${modifiedSuffix}
                // \nPersonal Information
                // \n
                // `;
                // doc.fontSize(14).text(content, 40, 80);
                // // Add a line
                

                // Finalize the PDF
                const buffers = [];
                doc.on("data", buffers.push.bind(buffers));
                doc.on("end", function() {
                    const pdfData = Buffer.concat(buffers);
                    res.setHeader("Content-Type", "application/pdf");
                    res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
                    res.send(pdfData);
                });
                doc.end();
        
            }
        })
        
    }
}

module.exports = new Forms;