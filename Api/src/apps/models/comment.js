const mongoose = require("../../common/database")();

const CommentSchema = new mongoose.Schema({
    product_id : {
        type: String,
        ref: "Products",
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    }
}, {timestamps : true});

const CommentModel = mongoose.model("Comments", CommentSchema, "comments");

module.exports = CommentModel;