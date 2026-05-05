export class ItensPedido {
    #id;
    #pedidoId;
    #produtoId;
    #quantidade;
    #valorItem;

    //Constructor
    constructor(pProdutoId, pQuantidade, pValorItem, pId, pPedidoId) {
        this.#produtoId = pProdutoId;
        this.#quantidade = pQuantidade;
        this.#valorItem = pValorItem;
        this.#id = pId;
        this.#pedidoId =pPedidoId;

    }

    //Getters
    get id() {
        return this.#id;
    }
    get pedidoId() {
        return this.#pedidoId;
    }
    get produtoId() {
        return this.#produtoId;
    }
    get quantidade() {
        return this.#quantidade;
    }
    get valorItem() {
        return this.#valorItem;
    }

    //Setters
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }
    set pedidoId(value) {
        this.#validarpedidoId(value);
        this.#pedidoId = value;
    }
    set produtoId(value) {
        this.#validarprodutoId(value);
        this.#produtoId = value;
    }
    set quantidade(value) {
        this.#validarquantidade(value);
        this.#quantidade = value;
    }
     set valorItem(value) {
        this.#validarvalorItem(value);
        this.#valorItem = value;
    }
    //Métodos auxiliares 
    #validarId(value) {
        if (!value || value <= 0) {
            throw new Error("Verifique o Id enviado");
        }
    }
    #validarpedidoId(value) {
        if (!value || value <= 0) {
            throw new Error("Verifique o Id enviado");
        }
    }
    #validarprodutoId(value) {
        if (!value || value <=0) {
            throw new Error("Não foi possível obter o sub total");
        }
    }
    #validarquantidade(value) {
        if (!value || value <=0) {
            throw new Error("Não foi possível obter o sub total");
        }
    }
    #validarvalorItem(value) {
        if (!value || value <=0) {
            throw new Error("Não foi possível obter o sub total");
        }
    }
    static calcularSubTotalItens(itens){
        return(itens.reduce(
            (total,item) => total+(item.valorItem * item.quantidade), 0 
        ));
    }


    //desing patern
    static criar(dados) {
        return new ItensPedido(dados.produtoId, dados.quantidade, dados.valorItem, null, null);
    }
    static editar(dados, id) {
        return new ItensPedido( dados.produtoId, dados.quantidade, dados.valorItem, id, dados.pedidoId);
    }
}