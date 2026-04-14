export class Telefone {
    #Id;
    #Telefone;
    #IdCliente;

    constructor(pTelefone, pIdCliente, pId) {
        this.id = pId;
        this.telefone = pTelefone;
        this.idCliente = pIdCliente;
    }

    // Getters e Setters
    get id() {
        return this.#Id;
    }
    set id(value) {
        this.#validarId(value);
        this.#Id = value;
    }

    get telefone() {
        return this.#Telefone;
    }
    set telefone(value) {
        this.#validarTelefone(value);
        this.#Telefone = value;
    }

    get idCliente() {
        return this.#IdCliente;
    }
    set idCliente(value) {
        this.#validarIdCliente(value);
        this.#IdCliente = value;
    }

    // Validações
    #validarId(value) {
        if (value !== null && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }

    #validarTelefone(value) {
        console.log(value);
        
        if (value.length <= 0 || value.length > 11) {
            throw new Error('Verifique o telefone enviado');
        }
    }

    #validarIdCliente(value) {
        if (!value || value <= 0) {
            throw new Error('ID do cliente inválido');
        }
    }

    // Factory Methods
    static criar(dados) {
        return new Telefone(
            dados.id, //erro
            dados.telefone,
            dados.idCliente
        );
    }

    static alterar(dados, id) {
        return new Telefone(
            dados.telefone,
            dados.idCliente,
            null
        );
    }
}
