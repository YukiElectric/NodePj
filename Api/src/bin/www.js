const app = require("../apps/app");
const port = require("config").get("app.port");

const server = app.listen(port,(req, res) => {
    console.log(`Server listening on port ${port}`);
})