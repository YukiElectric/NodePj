const ProductModel = require("../models/product");
const UserModel = require("../models/user");
const CommentModel = require("../models/comment");

const index = async (req, res) => {
    const users = await UserModel.find();
    const products = await ProductModel.find();
    const comments = await CommentModel.find();
    res.render("admin/admin", {user : users.length, product :products.length, comment : comments.length});
}

module.exports = {
    index,
}