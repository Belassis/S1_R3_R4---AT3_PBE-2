export class Cliente {
    #Id;
    #Nome;
    #Cpf;

    constructor(pId, pNome, pCpf) {
        this.id = pId;
        this.Nome = pNome;
        this.cpf = pCpf;
    }

    get id() {
        return this.#Id;
    }
    set id(value) {
        this.#validarId(value);
        this.#Id = value;
    }

    get Nome() {
        return this.#Nome;
    }
    set Nome(value) {
        this.#validarNome(value);
        this.#Nome = value;
    }

    get cpf() {
        return this.#Cpf;
    }
    set cpf(value) {
        this.#validarCpf(value);
        this.#Cpf = value;
    }

    #validarId(value) {
        if (value !== null && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }

    #validarCpf(value) {
        if (!value || value.toString().length !== 11) {
            throw new Error('CPF deve ter 11 dígitos');
        }
    }

    static criar(dados) {
        return new Cliente(dados.id ?? null, dados.nome, dados.cpf);
    }

    static alterar(dados, id) {
        return new Cliente(id, dados.nome, dados.cpf);
    }
}
