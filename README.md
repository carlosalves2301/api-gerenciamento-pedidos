# API de Gerenciamento de Pedidos

## 1. Descrição do projeto

API REST desenvolvida em Node.js e Express para gerenciar pedidos de uma pequena loja.

O sistema permite cadastrar pedidos, listar pedidos existentes, consultar pedidos por ID e atualizar seus status.

O projeto foi desenvolvido como atividade acadêmica, aplicando conceitos de APIs REST, organização em camadas, validação de dados e testes automatizados.

## 2. Tecnologias utilizadas

- Node.js
- JavaScript
- Express
- Jest
- Supertest
- Postman
- Git e GitHub

## 3. Instalação e execução

**Pré-requisito:** Node.js instalado.

Clone o repositório e acesse a pasta do projeto:

```bash
git clone URL_DO_REPOSITORIO
cd api-gerenciamento-pedidos
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

A API estará disponível em:

`http://localhost:3000`

Os dados são armazenados em memória e são perdidos quando o servidor é reiniciado.

## 4. Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| POST | /pedidos | Cadastrar pedido |
| GET | /pedidos | Listar pedidos |
| GET | /pedidos/:id | Consultar pedido por ID |
| PATCH | /pedidos/:id/status | Atualizar status |

### Exemplo de cadastro

**POST /pedidos**

```json
{
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal"
}
```

Resposta esperada: HTTP 201, com o pedido cadastrado, ID gerado e status inicial `recebido`.

## 5. Regras de validação

- O nome do cliente é obrigatório.
- O valor deve ser um número maior que zero.
- Os tipos permitidos são `entrega` e `retirada`.
- As prioridades permitidas são `normal`, `media` e `alta`.
- O status inicial de um pedido é `recebido`.

### Transições de status

- `recebido` → `em_preparacao` ou `cancelado`
- `em_preparacao` → `enviado` ou `cancelado`
- `enviado` → `entregue`
- `entregue` → nenhuma transição permitida
- `cancelado` → nenhuma transição permitida

## 6. Códigos HTTP

| Código | Significado |
|---|---|
| 200 | Operação realizada com sucesso |
| 201 | Pedido cadastrado |
| 400 | Dados inválidos ou transição não permitida |
| 404 | Pedido ou rota não encontrado |
| 500 | Erro interno inesperado |

## 7. Arquitetura

O projeto utiliza uma arquitetura organizada em camadas:

- **Routes:** definição das rotas HTTP.
- **Controllers:** recebimento das requisições e envio das respostas.
- **Services:** regras de negócio, validações e armazenamento em memória.
- **Errors:** identificação dos erros de validação.
- **Tests:** testes automatizados da API.

Essa separação facilita a manutenção, a organização e os testes do código.

## 8. Testes

Os testes automatizados utilizam Jest e Supertest.

Para executar:

```bash
npm test
```

Foram implementados nove testes automatizados, incluindo cadastro, listagem, consulta inexistente, atualização de status, validações e transições inválidas.

Também foram realizados testes manuais utilizando Postman.

As capturas de tela dos testes manuais estão organizadas na pasta `evidencias`.

## 9. Uso de inteligência artificial

A inteligência artificial foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto, auxiliando na organização da estrutura, na elaboração de exemplos de código, nas validações e na criação dos testes automatizados.

Uma sugestão aceita e posteriormente modificada foi a implementação da atualização de status. Inicialmente, a solução verificava apenas se o status informado era reconhecido. Posteriormente, foram adicionadas regras de transição para impedir mudanças incompatíveis com o fluxo do pedido.

As implementações foram verificadas por meio de testes manuais no Postman e testes automatizados com Jest.

## 10. Autor

Projeto acadêmico desenvolvido para a disciplina de desenvolvimento de APIs.