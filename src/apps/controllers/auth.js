const UserModel = require("../models/user");

var status = false;

const getLogin = (req, res) =>{
    res.render("./admin/login",{status});
}

const postLogin = async (req, res) => {

    let {email, password} = req.body;

    const users = await UserModel.find({email : email , password : password});

    if(users.length != 0) {
        status = false;
        res.redirect("/admin/dashboard");
    } else {
        status = true;
        res.render("./admin/login",{status});
    }
}

const logout = (req, res) => {
    res.send("logout");
}

module.exports = {
    getLogin,
    postLogin,
    logout,
}