module.exports = {
    app: {
        port: 6969,
        static_folder: `${__dirname}/../src/public`,
        router: `${__dirname}/../src/routers/web`,
        view_folder : `${__dirname}/../src/apps/views`,
        view_engine : "ejs",
        session_key : "SESSION_KEY",
    },
    mail : {
        host : "smtp.gmail.com",
        post : 587,
        secure : false,
        auth : {
            user : "yukipham0702@gmail.com",
            pass : "ogwn sato wznz sukr",
            // user : "quantri.vietproshop@gmail.com",
            // pass : "tjpj rclg ithn rkby"
        }
    }
}