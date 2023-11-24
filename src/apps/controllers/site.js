const moment = require("moment/moment");
const pagination = require("../../common/pagination");
const CategoryModel = require("../models/category");
const CommentModel = require("../models/comment");
const ProductModel = require("../models/product");

const home = async (req, res)=>{
    const featured = await ProductModel.find({featured : true, is_stock : true}).sort({_id : -1}).limit(6);
    const latest = await ProductModel.find({featured : true}).sort({_id : -1}).limit(6);
    res.render("./site/index",{featured, latest});
}
const category = async (req, res)=>{
    const limit = 12;
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const products = await ProductModel.find({cat_id : id}).limit(limit).skip(skip);
    const category = await CategoryModel.findById(id);
    const totalRows = await ProductModel.find({cat_id : id}).countDocuments();
    const totalPages = Math.ceil(totalRows / limit);
    const pages = pagination(page, totalPages);
    const next = page + 1;
    const hasNext = page < totalPages ? true : false;
    const prev = page - 1;
    const hasPrev = page > 1 ? true : false;
    res.render("./site/category", {products, category, pages, page, totalPages, next, hasNext, prev, hasPrev});
}
const product = async (req, res)=>{
    const limit = 10;
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const product = await ProductModel.findById(id);
    product.price = (Math.ceil(eval(product.price) / 1000) * 1000).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    const data = await CommentModel.find({prd_id : id}).sort({_id : -1}).limit(limit).skip(skip);
    const comments = data.map((item) => {
        item = {item, time : moment(new Date(item.updatedAt)).fromNow()};
        return item;
    })
    const totalRows = await CommentModel.find({prd_id : id}).countDocuments();
    const totalPages = Math.ceil(totalRows / limit);
    const pages = pagination(page, totalPages);
    const next = page + 1;
    const hasNext = page < totalPages ? true : false;
    const prev = page - 1;
    const hasPrev = page > 1 ? true : false
    res.render("./site/product",{product, comments, pages, page, totalPages, next, hasNext, prev, hasPrev});
}
const comment = async (req, res) => {
    const prd_id = req.params.id;
    const {full_name, email, body} = req.body;
    const comment = {prd_id, full_name, email, body};
    await new CommentModel(comment).save();
    res.redirect(req.path);
}
const search = (req, res)=>{
    res.render("./site/search");
}
const cart = (req, res)=>{
    res.render("./site/cart");
}
const success = (req, res)=>{
    res.render("./site/success");
}

module.exports = {
    home,
    category,
    product,
    search,
    cart,
    success,
    comment
}
