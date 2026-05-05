export class Pedido {
    #id;
    #clienteId;
    #subTotal;
    #status;
    #dataCad;

    //Constructor
    constructor(pClienteId, pSubTotal, pStatus, pId){
        this.#clienteId = pClienteId;
        this.#subTotal = pSubTotal;
        this.#status = pStatus;
        this.#id = pId;
    }
    //Getters
    get id() {
        return this.#id;
    }
    get clienteId() {
        return this.#clienteId;
    }
    get subTotal() {
        return this.#subTotal;
    }
    get status() {
        return this.#status;
    }
     get dataCad() {
        return this.#dataCad;
    }

    //Setters
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }
    set clienteId(value) {
        this.#validarclienteId(value);
        this.#clienteId = value;
    }
    set subTotal(value) {
        this.#validarsubTotal(value);
        this.#subTotal = value;
    }
        set status(value) {
        this.#status = value;
    }
    //Métodos auxiliares 
    #validarId(value) {
        if (value || value <=0) {
            throw new Error("Verifique o Id enviado");
        }
    }
    #validarclienteId(value) {
        if (!value || value <=0) {
            throw new Error("Verifique o Id enviado");
        }
    }
    #validarsubTotal(value) {
        if (!value || value <=0) {
            throw new Error("Não foi possível obter o sub total");
        }
    }

    //desing patern
    static criar(dados) {
        return new Pedido(dados.clienteId, dados.subTotal, dados.status, null);
    }
    static editar(dados, id) {
        return new Pedido(dados.clienteId, dados.subTotal, dados.status, id);
    }
}