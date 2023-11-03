const UserModel = require("../models/user");
const pagination = require("../../common/pagination");

const index = async (req, res) => {
    const limit = 30;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const users = await UserModel.find().limit(limit).skip(skip);
    const totalRows = await UserModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows / limit);
    const pages = pagination(page, totalPages);
    const next = page + 1;
    const hasNext = page < totalPages ? true : false;
    const prev = page - 1;
    const hasPrev = page > 1 ? true : false;
    res.render("./admin/users/user",{users, pages, page, totalPages, next, hasNext, prev, hasPrev});
}

const create = (req, res) => {
    res.render("./admin/users/add_user", {status: true});
}

const edit = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.render("./admin/users/edit_user", {user, error : ""});
}

const del = async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndDelete(id);
    res.redirect("/admin/users");
}

const store = async (req, res) => {
    const {id} = req.query;
    const {full_name, email, password, role, retype_password} = req.body;
    const existingUser = await UserModel.find({email, _id: {$ne : id}});
    const user = {full_name, email, password, role};
    if(existingUser.length!=0) {
        if(id){
            if(password!=retype_password) res.render("./admin/users/edit_user", {user, error : "all-error"});
            else res.render("./admin/users/edit_user", {user, error : "existing-email"});
        }else {
            res.render("./admin/users/add_user",{status: false});
        }
    }else {
        if(id){
            if(password!=retype_password) res.render("./admin/users/edit_user", {user, error : "password-missmatch"});
            else {
                await UserModel.findByIdAndUpdate(id,user);
                res.redirect("/admin/users");
            }
        }else {
            res.redirect("/admin/users");
            await new UserModel(user).save();
        }
    }
}

module.exports = {
    index,
    create,
    edit,
    del,
    store
}