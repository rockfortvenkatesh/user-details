const usercontroller = require('../controllers/user.controller')
const user = require('../models/user.model')

module.exports=(app)=>{
    app.post("/api/add/user",usercontroller.createuser);
    app.get("/api/allusers",usercontroller.findAll);
    app.get("/api/allusers/searchbyname/:name",usercontroller.searchbyname);
    app.get("/api/allusers/sortbyage",usercontroller.sortbyage);
    
}