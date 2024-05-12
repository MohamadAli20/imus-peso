const model = require("../models/Form");
const bodyParser = require("body-parser");

class Forms{
    add(req, res){
        console.log(req.body.personalInformation);
    }
}

module.exports = new Forms;