const modelForm = require("../models/Form");
const model = require("../models/User"); /* move the controller methods to Form model */
const PDFDocument = require("pdfkit");
const fs = require("fs");

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
        const id = req.body.applicationId;

        model.get_application_by_id(id, (error, row) => {
            if(error){
                console.error(error);
            }
            if(row){
                // Create a new PDF document
                const doc = new PDFDocument();
            
                // Set margins
                const margin = 40;
                const headerHeight = 40; // Height of the header
            
                // Extract data from the object
                const {
                    surname,
                    firstname,
                    middlename,
                    suffix,
                    birthdate,
                    email,
                    contact,
                    height,
                    gender,
                    civil_status,
                    religion,
                    address,
                    employment_status,
                    occupation,
                    preferred_work_occupation,
                    language1,
                    language2,
                    other_language,
                    elementary_school,
                    elementary_year_graduated,
                    secondary_school,
                    secondary_year_graduated,
                    tertiary_school,
                    tertiary_course,
                    tertiary_year_graduated,
                    skills
                } = row[0];
            
                const skillValues = Object.values(JSON.parse(skills));
            
                function drawHeader(margin) {
                    doc.fontSize(20).text('Applicant Information', margin);
                }
            
                // Draw header on the first page with margin
                drawHeader(margin);
            
                // Construct content
                let content = `
                ${surname}, ${firstname} ${middlename} ${suffix}
            
                Personal Information:
            
                Date of Birth: ${birthdate}
                Email: ${email}
                Contact: ${contact}
                Height: ${height}
                Gender: ${gender}
                Civil Status: ${civil_status}
                Religion: ${religion}
                Address: ${JSON.parse(address).house_no_street}, ${JSON.parse(address).barangay}, ${JSON.parse(address).city_municipality}, ${JSON.parse(address).province}
            
                Education Attainment:
            
                Elementary Level:
                ${elementary_school}, Graduated ${elementary_year_graduated}
                Secondary:
                ${secondary_school}, Graduated ${secondary_year_graduated}
                Tertiary:
                ${tertiary_school}, ${tertiary_course} - ${tertiary_year_graduated}
            
                Employment Status: ${JSON.parse(employment_status).employment_status}
                Preferred Work Occupation: ${JSON.parse(preferred_work_occupation).type_work_occupation}
                Occupation: ${JSON.parse(occupation).occupation1}
            
                Languages:
                • English: ${JSON.parse(language1).read === 1 ? 'Read, ' : ''}${JSON.parse(language1).write === 1 ? 'Write, ' : ''}${JSON.parse(language1).speak === 1 ? 'Speak, ' : ''}${JSON.parse(language1).understand === 1 ? 'Understand' : ''}
                • Filipino: ${JSON.parse(language2).read === 1 ? 'Read, ' : ''}${JSON.parse(language2).write === 1 ? 'Write, ' : ''}${JSON.parse(language2).speak === 1 ? 'Speak, ' : ''}${JSON.parse(language2).understand === 1 ? 'Understand' : ''}
                • Other Languages: ${Object.keys(JSON.parse(other_language)).join(', ')}
            
                Skills: ${skillValues}
                `;
                
                // Draw horizontal line
                doc.moveTo(margin, margin + headerHeight + doc.currentLineHeight())
                    .lineTo(doc.page.width - margin, margin + headerHeight + doc.currentLineHeight())
                    .stroke();
            
                // Write content to PDF with margin
                let y = margin + headerHeight + doc.currentLineHeight();
                doc.fontSize(12).text(content, 0, y, { width: 700, align: 'left' });
                
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