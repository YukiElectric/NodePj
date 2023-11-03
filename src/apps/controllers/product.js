const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const pagination = require("../../common/pagination");
const slug = require("slug");
const fs = require("fs");
const path = require("path");

const index = async (req, res) => {
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const data = await ProductModel.find({}).sort({ _id: -1 }).limit(limit).skip(skip).populate({ path: "cat_id" });
    const products = data.map((item) => {
        item.price = (Math.ceil(eval(item.price) / 1000) * 1000).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
        return item;
    })
    const totalRows = await ProductModel.find().countDocuments();
    const totalPages = Math.ceil(totalRows / limit);
    const pages = pagination(page, totalPages);
    const next = page + 1;
    const hasNext = page < totalPages ? true : false;
    const prev = page - 1;
    const hasPrev = page > 1 ? true : false;
    res.render("admin/products/product", { products, pages, page, totalPages, next, hasNext, prev, hasPrev });
}

const create = async (req, res) => {
    const categories = await CategoryModel.find();
    res.render("admin/products/add_product", { categories });
}

const edit = async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    const categories = await CategoryModel.find();
    res.render("admin/products/edit_product", { product, categories });
}

const del = async (req, res) => {
    const id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
    res.redirect("/admin/products");
}

const store = async (req, res) => {
    const {id} = req.query;
    const { file, body } = req;
    const product = {
        name: body.name,
        slug: slug(body.name),
        price: body.price,
        warranty: body.warranty,
        accessories: body.accessories,
        promotion: body.promotion,
        status: body.status,
        cat_id: body.cat_id,
        is_stock: body.is_stock,
        featured: body.featured == "check",
        description: body.description,
    }
    if (file) {
        const thumbnail = "products/" + file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images/", thumbnail));
        product["thumbnail"] = thumbnail;
        if (!id) {
            await new ProductModel(product).save();
            res.redirect("/admin/products");
        }
    }
    if(id) {
        await ProductModel.findByIdAndUpdate(id, product);
        res.redirect("/admin/products");
    }
}

module.exports = {
    index,
    create,
    edit,
    del,
    store
}