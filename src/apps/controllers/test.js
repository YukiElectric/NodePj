const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
// let test = (req , res) => {
//     let data = 10;
//     res.render("test", {data});
//     // res.redirect("/test");
// }

let test = (req, res) => {
    // const product = ProductModel.find({},(err, docs) => {
    //     console.log(docs);
    // });
    

    ProductModel.find().populate({path: "cat_id"}).exec((err,docs) => {
        console.log(docs);
    })
}

const testForm = (req, res) => {
    res.send(`
        <form method=post>
            <input type=text name=email />
            <input type=submit name=sbm value=Send />
        </form>
    `);
}


const actionForm = (req, res) => {
    res.send(req.body.email);
}

module.exports = {
    testForm,
    actionForm,
    test,
}