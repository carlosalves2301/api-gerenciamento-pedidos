
const express = require("express");

const pedidoRoutes = require("./routes/pedidoRoutes");

const app = express();

// Permite receber dados no formato JSON
app.use(express.json());

// Rota principal dos pedidos
app.use("/pedidos", pedidoRoutes);

// Rota inicial para verificar se a API está funcionando
app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API de Gerenciamento de Pedidos funcionando!"
    });
});

// Tratamento de rotas inexistentes
app.use((req, res) => {
    res.status(404).json({
        mensagem: "Rota não encontrada."
    });
});

module.exports = app;
