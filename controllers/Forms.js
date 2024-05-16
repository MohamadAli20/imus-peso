const model = require("../models/Form");
const bodyParser = require("body-parser");

class Forms{
    add(req, res){
        model.insert(req.body, (error) => {
            if(error){
                console.error(error);
            }
        })
    }
}

module.exports = new Forms;