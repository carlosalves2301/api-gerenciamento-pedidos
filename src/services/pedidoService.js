
const ErroValidacao = require("../errors/ErroValidacao");

const pedidos = [];

let proximoId = 1;

// Status permitidos para os pedidos
const statusPermitidos = [
    "recebido",
    "em_preparacao",
    "enviado",
    "entregue",
    "cancelado"
];

// Tipos permitidos
const tiposPermitidos = [
    "entrega",
    "retirada"
];

// Prioridades permitidas
const prioridadesPermitidas = [
    "normal",
    "media",
    "alta"
];

// Cadastrar pedido
function cadastrarPedido(dados) {

    if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
        throw new ErroValidacao("Os dados do pedido são obrigatórios.");
    }

    const { cliente, tipo, valor, prioridade } = dados;

    if (!cliente || typeof cliente !== "string" || !cliente.trim()) {
        throw new ErroValidacao("O nome do cliente é obrigatório.");
    }

    if (!tiposPermitidos.includes(tipo)) {
        throw new ErroValidacao("Tipo de pedido inválido.");
    }

    if (typeof valor !== "number" || !Number.isFinite(valor) || valor <= 0) {
        throw new ErroValidacao("O valor deve ser um número maior que zero.");
    }

    if (!prioridadesPermitidas.includes(prioridade)) {
        throw new ErroValidacao("Prioridade inválida.");
    }

    const pedido = {
        id: proximoId++,
        cliente: cliente.trim(),
        tipo,
        valor,
        prioridade,
        status: "recebido"
    };

    pedidos.push(pedido);

    return pedido;
}

// Listar pedidos
function listarPedidos() {
    return pedidos;
}

// Consultar pedido pelo ID
function buscarPedidoPorId(id) {
    return pedidos.find(pedido => pedido.id === Number(id));
}

// Atualizar status do pedido
function atualizarStatus(id, novoStatus) {

    const pedido = buscarPedidoPorId(id);

    if (!pedido) {
        const erro = new Error("Pedido não encontrado.");
        erro.statusCode = 404;
        throw erro;
    }

    if (!statusPermitidos.includes(novoStatus)) {
        throw new ErroValidacao("Status inválido.");
    }

    // Regras de transição de status
    const transicoesPermitidas = {
        recebido: ["em_preparacao", "cancelado"],
        em_preparacao: ["enviado", "cancelado"],
        enviado: ["entregue"],
        entregue: [],
        cancelado: []
    };

    if (!transicoesPermitidas[pedido.status].includes(novoStatus)) {
        throw new ErroValidacao("Transição de status não permitida.");
    }

    pedido.status = novoStatus;

    return pedido;
}

// Exportar funções
module.exports = {
    cadastrarPedido,
    listarPedidos,
    buscarPedidoPorId,
    atualizarStatus
};
