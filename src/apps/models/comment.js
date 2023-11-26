const { model } = require("mongoose");

const mongoose = require("../../common/database")();

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    prd_id : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    full_name : {
        type : String,
        required : true
    }
},{timestamps : true})

const CommentModel = mongoose.model("Comments",UserSchema,"comments");

module.exports = CommentModel;