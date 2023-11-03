const CategoryModel = require("../models/category");
const pagination = require("../../common/pagination");
const slug = require("slug")

const index = async (req, res) => {
    const limit = 30;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const categories = await CategoryModel.find().limit(limit).skip(skip);
    const totalRows = await CategoryModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows / limit);
    const pages = pagination(page, totalPages);
    const next = page + 1;
    const hasNext = page < totalPages ? true : false;
    const prev = page - 1;
    const hasPrev = page > 1 ? true : false;
    res.render("./admin/categories/category",{categories, pages, page, totalPages, next, hasNext, prev, hasPrev});
}

const create = (req, res) => {
    res.render("./admin/categories/add_category",{status : true});
}

const edit = (req, res) => {
    res.render("./admin/categories/edit_category");
}

const del = async (req, res) => {
    const id = req.params.id;
    await CategoryModel.deleteOne({_id : id});
    res.redirect("/admin/categories");
}

const store = async (req, res) => {
    const {title} = req.body;
    const existingCategory = await CategoryModel.find({$or : [{title}, {slug : title}]});
    if(existingCategory.length!=0) {
        res.render("./admin/categories/add_category",{status : false});
    }else {
        const category = {
            title,
            slug : slug(title)
        }
        await new CategoryModel(category).save();
        res.redirect("/admin/categories");
    }
}

module.exports = {
    index,
    create,
    edit,
    del,
    store
}