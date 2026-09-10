const express = require("express");

const app = express();
const porta = 3001;

const dados = require("../dados.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/inventario", (req, res) => {
    res.status(200).json(dados);
});

app.get("/inventario/:id", (req, res) => {
    const id = Number(req.params.id);

    const item = dados.find((item) => item.id === id);

    if (!item) {
        return res.status(404).json({
            mensagem: "Item não encontrado"
        });
    }

    res.status(200).json(item);
});

app.post("/inventario", (req, res) => {
    console.log(req.body);
    const novoItem = {
        id: req.body.id,
        item: req.body.item,
        local: req.body.local,
        dataRegistro: req.body.dataRegistro,
        valor: Number(req.body.valor),
        patrimonio: req.body.patrimonio
    };

    dados.push(novoItem);

    res.status(201).json(novoItem);
});

app.put("/inventario/:id", (req, res) => {
    const dados = lerDados();
    const id = Number(req.params.id);

    const indice = dados.findIndex((item) => item.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Item não encontrado"
        });
    }

    const itemAtualizado = {
        id: id,
        item: req.body.item,
        local: req.body.local,
        dataRegistro: req.body.dataRegistro,
        valor: Number(req.body.valor),
        patrimonio: req.body.patrimonio
    };

    dados[indice] = itemAtualizado;
    salvarDados(dados);

    res.status(200).json(itemAtualizado);
});

app.delete("/inventario/:id", (req, res) => {
    const dados = lerDados();
    const id = Number(req.params.id);

    const indice = dados.findIndex((item) => item.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Item não encontrado"
        });
    }

    dados.splice(indice, 1);
    salvarDados(dados);

    res.status(200).json({
        mensagem: "Item excluído com sucesso"
    });
});

app.listen(porta, () => {
    console.log(`Servidor funcionando em http://localhost:${porta}`);
});