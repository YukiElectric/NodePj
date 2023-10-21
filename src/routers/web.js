const express = require("express");

const router = express.Router();

const testForm = require("../apps/controllers/test");


router.get("/newtest", testForm.test);
router.get("/test", testForm.testForm);
router.post("/test", testForm.actionForm);

const authController = require("../apps/controllers/auth");

const adminCotroller = require("../apps/controllers/admin");

const productController = require("../apps/controllers/product");

router.get("/admin/login", authController.getLogin);

router.post("/admin/login", authController.postLogin)

router.get("/admin/logout", authController.logout);

router.get("/admin/dashboard", adminCotroller.index);

router.get("/admin/products", productController.index);

router.get("/admin/product/create", productController.create);

router.get("/admin/product/edit/:id", productController.edit);

router.get("/admin/product/delete/:id", productController.del);

module.exports = router;