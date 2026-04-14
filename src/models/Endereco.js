export class Endereco {
    #id;
    #cep;
    #numero;
    #complemento;
    #logradouro;
    #bairro;
    #cidade;
    #uf;
    #idCliente;

    constructor(pCep, pNumero, pComplemento, pLogradouro, pBairro, pCidade, pUf, pIdCliente, pId) {
        this.id = pId ?? null;
        this.cep = pCep;
        this.numero = pNumero;
        this.complemento = pComplemento;
        this.logradouro = pLogradouro;
        this.bairro = pBairro;
        this.cidade = pCidade;
        this.uf = pUf;
        this.idCliente = pIdCliente;
    }

 // Getters e Setters

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get cep() {
        return this.#cep;
    }
    set cep(value) {
        this.#validarCep(value);
        this.#cep = value;
    }

    get numero() {
        return this.#numero;
    }
    set numero(value) {
        if (!value || isNaN(value) || value <= 0) {
            throw new Error('Número inválido');
        }
        this.#numero = value;
    }

    get complemento() {
        return this.#complemento;
    }
    set complemento(value) {
        if (!value || value.trim().length < 1) {
            throw new Error('Complemento obrigatório');
        }
        this.#complemento = value;
    }

    get logradouro() {
        return this.#logradouro;
    }
    set logradouro(value) {
        if (!value || value.trim().length < 3) {
            throw new Error('Logradouro inválido');
        }
        this.#logradouro = value;
    }

    get bairro() {
        return this.#bairro;
    }
    set bairro(value) {
        if (!value || value.trim().length < 2) {
            throw new Error('Bairro inválido');
        }
        this.#bairro = value;
    }

    get cidade() {
        return this.#cidade;
    }
    set cidade(value) {
        if (!value || value.trim().length < 2) {
            throw new Error('Cidade inválida');
        }
        this.#cidade = value;
    }

    get uf() {
        return this.#uf;
    }
    set uf(value) {
        if (!value || value.length !== 2) {
            throw new Error('UF inválida');
        }
        this.#uf = value.toUpperCase();
    }

    get idCliente() {
        return this.#idCliente;
    }
    set idCliente(value) {
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

// Validações
    #validarId(value) {
        if (value !== null && value <= 0) {
            throw new Error('ID inválido');
        }
    }

    #validarCep(value) {
        if (!value || value.toString().trim() === '') {
            throw new Error('CEP obrigatório');
        }
    }

    #validarIdCliente(value) {
        if (!value || value <= 0) {
            throw new Error('ID do cliente inválido');
        }
    }

    
// Factory Methods
    static criar(dados) {
        return new Endereco(
            dados.cep,
            dados.numero,
            dados.complemento,
            dados.logradouro,
            dados.bairro,
            dados.cidade,
            dados.uf,
            dados.idCliente ?? null,
            dados.id ?? null
        );
    }

    static alterar(dados, id) {
        return new Endereco(
            dados.cep,
            dados.numero,
            dados.complemento,
            dados.logradouro,
            dados.bairro,
            dados.cidade,
            dados.uf,
            dados.idCliente,
            id
        );
    }
}
