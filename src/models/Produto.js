export class Produto {
    #IdCategoria;
    #Nome;
    #Valor;
    #CaminhoImagem;
    #Id;

    constructor(pIdCategoria, pNome, pValor, pCaminhoImagem, pId) {
        this.IdCategoria = pIdCategoria;
        this.Nome = pNome;
        this.Valor = pValor;
        this.CaminhoImagem = pCaminhoImagem; 
        this.Id = pId;
    }

    // Métodos acessores = getters e setters
    get id() {
        return this.#IdCategoria;
    }
    set id(value) {
        this.#validarId(value);
        this.#Id = value;
    }

    get idCategoria() {
        return this.#IdCategoria;
    }
    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#IdCategoria = value;
    }
    get Nome(){
        return this.#Nome;
    }
    set Nome (value){
        this.#validarNome(value);
        this.#Nome=value; 
    }

    get Valor(){
        return this.#Valor;
    }
    set Valor(value){
        this.#validaValor(value);
        this.#Valor = value;
    }
    get CaminhoImagem(){
        return this.#CaminhoImagem;
    }
    set CaminhoImagem(value){
        this.#validarCaminhoImagem(value);
        this.#CaminhoImagem = value;
    }

    //Métodos auxiliares
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }

    #validarIdCategoria(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }

    #validaValor(value) {
        if (value === undefined || value === null, value <=0) {
            throw new Error('Verifique o valor do produto');
        }
    }

    #validarCaminhoImagem(value) {
        if (value && value.trim () === '') {
            throw new Error('Verifique o caminho da imagem');
        }
    }

    //Criação de objetos utilizando o Desing Pattern FACTROY METHOD
    static criar(dados){
        console.log('model/: ', dados.IdCategoria, dados.Nome, dados.Valor , dados.CaminhoImagem)
        return new Produto(dados.IdCategoria, dados.Nome, dados.Valor , dados.CaminhoImagem, null);
    }
    static alterar(dados, id){
        return new Produto(dados.IdCategoria, dados.Nome,  dados.Valor , null, id);
    }

}