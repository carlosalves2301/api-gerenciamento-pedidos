
const request = require("supertest");
const app = require("../src/app");

describe("Testes da API de Gerenciamento de Pedidos", () => {

    test("Deve cadastrar um pedido com sucesso", async () => {
        const resposta = await request(app)
            .post("/pedidos")
            .send({
                cliente: "Carlos Silva",
                tipo: "entrega",
                valor: 350,
                prioridade: "normal"
            });

        expect(resposta.statusCode).toBe(201);
        expect(resposta.body).toHaveProperty("id");
        expect(resposta.body.cliente).toBe("Carlos Silva");
        expect(resposta.body.status).toBe("recebido");
    });

    test("Deve listar os pedidos", async () => {
        const resposta = await request(app).get("/pedidos");

        expect(resposta.statusCode).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
    });

    test("Deve retornar 404 para pedido inexistente", async () => {
        const resposta = await request(app).get("/pedidos/999");

        expect(resposta.statusCode).toBe(404);
        expect(resposta.body.mensagem).toBe("Pedido não encontrado.");
    });

    test("Deve atualizar o status de um pedido", async () => {
        const criacao = await request(app)
            .post("/pedidos")
            .send({
                cliente: "Maria Silva",
                tipo: "retirada",
                valor: 150,
                prioridade: "alta"
            });

        expect(criacao.statusCode).toBe(201);

        const resposta = await request(app)
            .patch(`/pedidos/${criacao.body.id}/status`)
            .send({
                status: "em_preparacao"
            });

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body.status).toBe("em_preparacao");
    });

    test("Deve rejeitar pedido com dados inválidos", async () => {
        const resposta = await request(app)
            .post("/pedidos")
            .send({
                cliente: "",
                tipo: "entrega",
                valor: -100,
                prioridade: "normal"
            });

        expect(resposta.statusCode).toBe(400);
        expect(resposta.body).toHaveProperty("mensagem");
    });

test("Deve impedir uma transição de status inválida", async () => {
    const criacao = await request(app)
        .post("/pedidos")
        .send({
            cliente: "Pedro Santos",
            tipo: "entrega",
            valor: 200,
            prioridade: "media"
        });

    expect(criacao.statusCode).toBe(201);

    const resposta = await request(app)
        .patch(`/pedidos/${criacao.body.id}/status`)
        .send({
            status: "entregue"
        });

    expect(resposta.statusCode).toBe(400);
    expect(resposta.body.mensagem).toBe(
        "Transição de status não permitida."
    );
});

test("Deve retornar 404 ao atualizar pedido inexistente", async () => {
    const resposta = await request(app)
        .patch("/pedidos/999/status")
        .send({
            status: "em_preparacao"
        });

    expect(resposta.statusCode).toBe(404);
    expect(resposta.body.mensagem).toBe("Pedido não encontrado.");
});

test("Deve rejeitar um status inválido", async () => {
    const criacao = await request(app)
        .post("/pedidos")
        .send({
            cliente: "Ana Souza",
            tipo: "entrega",
            valor: 120,
            prioridade: "normal"
        });

    expect(criacao.statusCode).toBe(201);

    const resposta = await request(app)
        .patch(`/pedidos/${criacao.body.id}/status`)
        .send({
            status: "finalizado"
        });

    expect(resposta.statusCode).toBe(400);
    expect(resposta.body.mensagem).toBe("Status inválido.");
});

test("Deve rejeitar pedido com valor inválido", async () => {
    const resposta = await request(app)
        .post("/pedidos")
        .send({
            cliente: "João Santos",
            tipo: "retirada",
            valor: -50,
            prioridade: "alta"
        });

    expect(resposta.statusCode).toBe(400);
    expect(resposta.body.mensagem).toBe(
        "O valor deve ser um número maior que zero."
    );
});

});
