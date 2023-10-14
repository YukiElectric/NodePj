const express = require("express");

const config = require("config");

const app = express();

// Config View

app.set("views", config.get("app.view_folder"));
app.set("view engine", config.get("app.view_engine"));

app.use(express.urlencoded({extended: true}));
app.use("/static", express.static(config.get("app.static_folder")));

// Router
app.use(require(config.get("app.router")));
module.exports = app;
