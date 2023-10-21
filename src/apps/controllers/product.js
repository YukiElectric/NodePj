const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");

const index = async (req, res) => {
    const product = await ProductModel.find({}).populate({path : "cat_id"});
    const products = product.map((item) => {
        item.price = eval(item.price).toLocaleString('vn-VN');
        console.log(item.price);
        return item;
    })
    res.render("admin/products/product", {products});
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