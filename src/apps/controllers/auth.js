const UserModel = require("../models/user");
const CryptoJS = require("crypto-js");
const config = require("config");
const bcrypt = require("bcrypt");

const getLogin = (req, res) =>{
    res.render("./admin/login",{status : false});
}

const postLogin = async (req, res) => {

    let {email, password} = req.body;

    const users = await UserModel.find({email : email });
    if(users.length != 0 && bcrypt.compare(users[0].password,password)) {
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

const getRegister = (req, res) => {
    res.render("./admin/register",{status : ""});
}

const postRegister = async (req, res) => {
    const {full_name, email, password, retype_password} = req.body;

    const user = await UserModel.find({email : email});

    if(password!=retype_password) res.render("./admin/register",{status : "password"});
    else if(user.length!=0) res.render("./admin/register",{status : "existing"});
    else {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const newUser = {
            email,
            password : hashed,
            full_name
        }
        await UserModel(newUser).save();
        res.redirect("/admin/login");
    }
}

module.exports = {
    getLogin,
    postLogin,
    logout,
    getRegister,
    postRegister
}