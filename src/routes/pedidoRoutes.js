
const express = require("express");

const router = express.Router();

const pedidoController = require("../controllers/pedidoController");

// Cadastrar pedido
router.post("/", pedidoController.cadastrarPedido);

// Listar todos os pedidos
router.get("/", pedidoController.listarPedidos);

// Consultar pedido pelo ID
router.get("/:id", pedidoController.buscarPedidoPorId);

// Atualizar status do pedido
router.patch("/:id/status", pedidoController.atualizarStatus);

module.exports = router;
