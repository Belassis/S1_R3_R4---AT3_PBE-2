import axios from "axios";
import { validarCPF } from "../Utils/validarCpf.js";
import { limparNumero } from "../Utils/limparNumero.js";
import clienteRepository from "../repositories/clienteRepositores.js";
import { Cliente } from "../models/Cliente.js";
import { Telefone } from "../models/Telefone.js";
import { Endereco } from "../models/Endereco.js";

const clienteController = {
    criar: async (req, res) => {
        try {
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;

            // Nome
            if (!nome || nome.trim().length < 3) {
                return res.status(400).json({ erro: "Nome inválido" });
            }

            // Número
            if (!numero || isNaN(numero)) {
                return res.status(400).json({ erro: "Número inválido" });
            }

            // Complemento
            if (!complemento) {
                return res.status(400).json({ erro: "Complemento inválido" });
            }

            const resApiCep = await verificarCep(cep); 
            validarCPF(cpf);
            const resTelefone = verificarTelefone(telefone);

            const cliente = Cliente.criar({
                nome,
                cpf
            });

        const tel = {
            numero: resTelefone.telefone
        };

        const endereco = {
            cep, logradouro: resApiCep.logradouro, numero, complemento, bairro: resApiCep.bairro, cidade: resApiCep.localidade, uf: resApiCep.uf
        };

        const id = await clienteRepository.criar(cliente, tel, endereco);

        return res.status(201).json({
            message: "Cliente criado com sucesso",
            id: id, cliente, telefone: tel, endereco

        });

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ocorreu um erro no servidor',
            errorMessage: error.message
        });
    }
},

    editar: async (req, res) => {
        try {
            const idCliente = req.params.id;
            const { telefone, numero, complemento, cep } = req.body;

            // resquest api
            const resApiCep = await verificarCep(cep);

            const telefones = Telefone.alterar({
                telefone,
                idCliente
            })

            const endereco = Endereco.alterar({
                numero: numero,
                cep: cep,
                complemento: complemento,
                logradouro: resApiCep.logradouro,
                cidade: resApiCep.localidade,
                bairro: resApiCep.bairro,
                uf: resApiCep.uf,
                idCliente: idCliente
            })

            const result = await clienteRepository.editar(telefones, endereco, idCliente);

            return res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao editar",
                error: error.message
            });
        }
    },

        selecionar: async (req, res) => {
            try {
                const result = await clienteRepository.selecionar();
                return res.status(200).json(result);

            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: "Erro ao listar",
                    error: error.message
                });
            }
        },

            deletar: async (req, res) => {
                try {
                    const id = req.params.id;

                    if (!id) {
                        return res.status(400).json({ erro: "ID não informado" });
                    }

                    const result = await clienteRepository.deletar(id);

                    return res.status(200).json({ result });

                } catch (error) {
                    console.error(error);
                    return res.status(500).json({
                        message: "Erro ao deletar",
                        error: error.message
                    });
                }
            },
};

export default clienteController;


// Verificar o CEP 
async function verificarCep(cep) {
    try {
        const resApiCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (resApiCep.data.erro) {
            throw new Error('Erro ao consultar o cep na api');
        }

        return resApiCep.data;

    } catch (error) {
        console.error(error)
        throw new Error("Erro ao buscar CEP");
    }
}

