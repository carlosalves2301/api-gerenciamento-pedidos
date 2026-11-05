
class ErroValidacao extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "ErroValidacao";
        this.statusCode = 400;
    }
}

module.exports = ErroValidacao;
