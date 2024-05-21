const modelForm = require("../models/Form");
const model = require("../models/User"); /* move the controller methods to Form model */

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
}

module.exports = new Forms;