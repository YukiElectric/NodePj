const checkLogin = (req, res, next) => {
    if(req.session.token) {
        return res.redirect("/admin/dashboard");
    }
    next();
}

const checkAdmin = (req, res, next) => {
    if(!req.session.token) {
        return res.redirect("/admin/login");
    }
    // if(!req.session.role) {
    //     return res.redirect("/");
    // }
    next();
}

module.exports = {
    checkLogin,
    checkAdmin
}