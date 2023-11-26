const UserModel = require("../models/user");
const CryptoJS = require("crypto-js");
const config = require("config");

var status = false;

const getLogin = (req, res) =>{
    res.render("./admin/login",{status});
}

const postLogin = async (req, res) => {

    let {email, password} = req.body;

    const users = await UserModel.find({email : email , password : password});
    if(users.length != 0) {
        req.session.token = CryptoJS.SHA256(config.get("app.session_key")).toString(CryptoJS.enc.Hex);
        req.session.role = users[0].role == "admin";
        status = false;
        res.redirect("/admin/dashboard");
    } else {
        status = true;
        res.render("./admin/login",{status});
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/admin/login");
}

module.exports = {
    getLogin,
    postLogin,
    logout,
}