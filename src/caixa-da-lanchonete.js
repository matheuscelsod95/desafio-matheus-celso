class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: 3.0,
            chantily: 1.5,
            suco: 6.2,
            sanduiche: 6.5,
            queijo: 2.0,
            salgado: 7.25,
            combo1: 9.5,
            combo2: 7.5,
        };

        this.descontoDinheiro = 0.05;
        this.acrescimoCredito = 0.03;
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Verificar se a forma de pagamento é válida
        if (!["dinheiro", "debito", "credito"].includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        let valorTotal = 0.0;
        let nomeItensCardapio = [];

        for (const item of itens) {

            const nomeComQuantidade = item.split(",");
            if (!this.cardapio.hasOwnProperty(nomeComQuantidade[0])) {
                return "Item inválido!";
            }

            if (nomeComQuantidade.length === 2 && nomeComQuantidade[1] !== '') {
                const nomeItem = nomeComQuantidade[0];
                const quantidade = nomeComQuantidade[1];


                if (quantidade >= '0' && quantidade != undefined) {
                    valorTotal += this.cardapio[nomeItem] * quantidade;
                }
                if (quantidade == '0') {
                    return "Quantidade inválida!";
                }

            } else {
                return "É necessário informar a quantidade."
            }

        }

        itens.forEach((item) => {
            let itemComQuantidade = item.split(',')
            nomeItensCardapio.push(itemComQuantidade[0])
        })

        if (!nomeItensCardapio.includes('cafe') && nomeItensCardapio.includes('chantily')) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (!nomeItensCardapio.includes('sanduiche') && nomeItensCardapio.includes('queijo')) {
            return "Item extra não pode ser pedido sem o principal";
        }

        // Aplicar desconto para pagamento em dinheiro
        if (formaDePagamento === "dinheiro") {
            valorTotal -= valorTotal * this.descontoDinheiro;

        }
        // Aplicar acréscimo para pagamento a crédito
        else if (formaDePagamento === "credito") {
            valorTotal += valorTotal * this.acrescimoCredito;

        }

        return (`R$ ${valorTotal.toFixed(2).replace(".", ",")}`); // Retornar o valor formatado com duas casas decimais
    }
}
export { CaixaDaLanchonete };

const caixa = new CaixaDaLanchonete();

const itens = ['cafe,2'];
const formaDePagamento = 'credito';

// Chamar o método calcularValorDaCompra
const valorTotal = caixa.calcularValorDaCompra(itens, formaDePagamento);


