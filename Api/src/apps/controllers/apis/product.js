const ProductModel = require("../../models/product");
const CommentModel = require("../../models/comment");
const pagination = require("../../../libs/pagination");

exports.index = async (req, res) => {
    const query = {};
    query.is_featured = req.query.is_featured || false;
    query.is_stock = req.query.is_stock || true;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = page*(limit-1);
    const product = await ProductModel.find(query).sort({_id : -1}).limit(limit).skip(skip);
    res.status(200).json({
        status : "success",
        filter : {
            ...query,
            page,
            limit
        },
        data : {
            docs : product
        },
        pages : await pagination(ProductModel, page, limit, query)
    });
}

exports.show = async (req, res) => {
    const {id} = req.params;
    const product = await ProductModel.findById(id);
    res.status(200)
        .json({
            status : "success",
            data : product
        })
}

exports.comments = async (req, res) => {
    const query = {};
    query.product_id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = limit*(page-1);
    const comments = await CommentModel.find(query).sort({_id : -1}).skip(skip).limit(limit);
    res.status(200).json({
        status : "success",
        filter : {
            page,
            limit
        },
        data : {
            docs : comments
        },
        pages : await pagination(CommentModel, page, limit, query)
    })
}

exports.storeComments = async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    const comment = {
        name : body.name,
        email : body.email,
        content : body.content,
        product_id : id
    }
    await CommentModel(comment).save();
    res.status(201)
        .json({
            status : "success",
            message : "Create comment successfully"
        })
}