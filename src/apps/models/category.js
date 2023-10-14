const { model } = require("mongoose");

const mongoose = require("../../common/database")();
const categorySchema = new mongoose.Schema({
    tittle : {
        type: String,
        required : true
    },
    slug : {
        type: String,
        required: true
    },
    description : {
        type: String
    }
},{timestamps: true});

const CategoryModel = mongoose.model("Categories",categorySchema,"categories");

module.exports = CategoryModel;