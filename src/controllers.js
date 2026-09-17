 const dados = require("../dados.json")

function autoIncrement() {
    const ultimoId = Number(dados[dados.length - 1].id)
    return ultimoId + 1
}

 //CRUDS
const create = (req, res) => {
    const dados = read.body
    dados.id = autoIncrement()
    dados.push(dados)
    //res.status(201).json(dados)
    res.redirect("http://127.0.0.1:3001/inventario")
}

 const read = (req, res) => {
    res.json(dados)
 }
 module.exports = {
    create,
    read
 }