const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const pagination = require("../../common/pagination");

const index = async (req, res) => {
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const skip = limit*(page -1);
    const data = await ProductModel.find({}).sort({_id : -1}).limit(limit).skip(skip).populate({path : "cat_id"});
    const products = data.map((item) => {
        item.price = (Math.ceil(eval(item.price)/1000)*1000).toLocaleString('vi-VN',{style: 'currency',
        currency: 'VND'});
        return item;
    })
    const totalRows = await ProductModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows/limit);
    const pages = pagination(page, totalPages);
    const next = page + 1;
    const hasNext = page < totalPages ? true : false;
    const prev = page - 1;
    const hasPrev = page > 1 ? true : false;
    res.render("admin/products/product", {products, pages, page, totalPages, next, hasNext, prev, hasPrev});
}

const create = (req, res) => {
    res.render("admin/products/add_product");
}

const edit = (req, res) => {
    res.render("admin/products/edit_product");
}

const del = (req, res) => {
    res.send("delete");
}

module.exports = {
    index,
    create,
    edit,
    del,
}