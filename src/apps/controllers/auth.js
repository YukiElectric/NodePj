const UserModel = require("../models/user");
const CryptoJS = require("crypto-js");
const config = require("config");

const getLogin = (req, res) =>{
    res.render("./admin/login",{status : false});
}

const postLogin = async (req, res) => {

    let {email, password} = req.body;

    const users = await UserModel.find({email : email , password : password});
    if(users.length != 0) {
        req.session.token = CryptoJS.SHA256(config.get("app.session_key")).toString(CryptoJS.enc.Hex);
        req.session.role = users[0].role == "admin";
        res.redirect("/admin/dashboard");
    } else {
        res.render("./admin/login",{status : true});
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