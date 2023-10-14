const index = (req, res) => {
    res.send("index");
}

const create = (req, res) => {
    res.send("create");
}

const edit = (req, res) => {
    res.send("edit");
}

const del = (req, res) => {
    res.send("delete");
}

module.exports = {
    index,
    create,
    edit,
    del,
}