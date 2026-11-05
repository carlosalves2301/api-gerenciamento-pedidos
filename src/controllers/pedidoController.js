
const pedidoService = require("../services/pedidoService");
const ErroValidacao = require("../errors/ErroValidacao");

// Cadastrar pedido
function cadastrarPedido(req, res) {
    try {
        const pedido = pedidoService.cadastrarPedido(req.body);

        return res.status(201).json(pedido);

    } catch (erro) {
        if (erro instanceof ErroValidacao) {
            return res.status(400).json({
                mensagem: erro.message
            });
        }

        return res.status(500).json({
            mensagem: "Erro interno ao cadastrar pedido."
        });
    }
}

// Listar pedidos
function listarPedidos(req, res) {
    try {
        const pedidos = pedidoService.listarPedidos();

        return res.status(200).json(pedidos);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro interno ao listar pedidos."
        });
    }
}

// Consultar pedido pelo ID
function buscarPedidoPorId(req, res) {
    try {
        const pedido = pedidoService.buscarPedidoPorId(req.params.id);

        if (!pedido) {
            return res.status(404).json({
                mensagem: "Pedido não encontrado."
            });
        }

        return res.status(200).json(pedido);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro interno ao consultar pedido."
        });
    }
}

// Atualizar status do pedido
function atualizarStatus(req, res) {
    try {
        const pedidoExistente = pedidoService.buscarPedidoPorId(
            req.params.id
        );

        if (!pedidoExistente) {
            return res.status(404).json({
                mensagem: "Pedido não encontrado."
            });
        }

        const status = req.body?.status;

        if (typeof status !== "string") {
            return res.status(400).json({
                mensagem: "O status deve ser informado."
            });
        }

        const pedido = pedidoService.atualizarStatus(
            req.params.id,
            status
        );

        return res.status(200).json(pedido);

    } catch (erro) {
        if (erro instanceof ErroValidacao) {
            return res.status(400).json({
                mensagem: erro.message
            });
        }

        if (erro.statusCode === 404) {
            return res.status(404).json({
                mensagem: erro.message
            });
        }

        return res.status(500).json({
            mensagem: "Erro interno ao atualizar status."
        });
    }
}

// Exportar funções
module.exports = {
    cadastrarPedido,
    listarPedidos,
    buscarPedidoPorId,
    atualizarStatus
};
