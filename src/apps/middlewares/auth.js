const checkLogin = (req, res, next) => {
    if(req.session.token) {
        return res.redirect("/admin/dashboard");
    }
    next();
}

const checkAdmin = (req, res, next) => {
    // if(!req.session.token) {
    //     return res.redirect("/admin/login");
    // }
    // if(!req.session.role) {
    //     return res.redirect("http://localhost:4200/");
    // }
    next();
}

module.exports = {
    checkLogin,
    checkAdmin
}