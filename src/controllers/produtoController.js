import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepositore.js";

const produtoController = {
    criar: async (req, res) => {
        try {
           if(!req.file){
            return res.status(500).json({ message: 'Imagem não criada'}) 
           }

           const {IdCategoria, Nome, Valor} = req.body
           const CaminhoImagem = req.file.filename


           const produto = Produto.criar({IdCategoria, Nome, Valor, CaminhoImagem});
        

           const result = await produtoRepository.criar(produto);

           res.status(201).json({result})

        } catch (error) {
            console.error(error);
            res.status(500).json({ MessageChannel: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    editar: async (req, res) => {
        try {
            const Id = req.params.id;
            const { IdCategoria, Nome, Valor } = req.body;
            const produto = Produto.alterar({ IdCategoria, Nome, Valor }, Id);
            const result = await produtoRepository.editar(produto);
            res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            res.status(500).json({ MessageChannel: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    deletar: async (req, res) => {
        try {
            const Id = req.params.id;
            const result = await produtoRepository.deletar(Id);
            res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ MessageChannel: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    selecionar: async (req, res) => {
        try {
            const result = await produtoRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ MessageChannel: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

}

export default produtoController;

