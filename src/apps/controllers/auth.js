
var status = false;

const getLogin = (req, res) =>{
    res.render("./admin/login",{status});
}

const postLogin = (req, res) => {
    let emailCheck = "vietpro.edu.vn@gmail.com";
    let passCheck = "123456";
    let {email, password} = req.body;
    if(emailCheck == email && passCheck == password) {
        status = false;
        res.redirect("/admin/dashboard");
    } else {
        status = true;
        res.render("./admin/login",{status});
    }
}

const logout = (req, res) => {
    res.send("logout");
}

module.exports = {
    getLogin,
    postLogin,
    logout,
}