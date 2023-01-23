const user = require("../models/user.model");

exports.createuser = async(req,res)=>{
const userObject = {
    userId : req.body.userId,
    name:req.body.name,
    age:req.body.age
}

try{
    const usercreated = await user.create(userObject);
    const post = {
        userId:usercreated.userId,
        name:usercreated.name,
        age:usercreated.age

    }

    res.status(201).send(post);
}catch(err){
    console.log("error while saving the user in db",err.message);
    res.status(500).send({
        message : "Some internal error while inserting the element"
    })
}
}

exports.findAll = async(req,res)=>{
    try{
        var users = await user.find();
    }catch (err) {
        console.log("error while fetching the user");
        res.status(500).send({
            message:"some internal error occured"
        })
    }

    res.status(200).send(users);
    
}


exports.searchbyname = async(req,res)=>{
   
    let name = await user.find({
            name:{$regex:req.params.name}
    })
    res.send(name);
    
}

exports.sortbyage = async(req,res)=>{
    var mysort = { age: 1 };
    let name = await user.find().sort(mysort);
    res.send(name);
    
}