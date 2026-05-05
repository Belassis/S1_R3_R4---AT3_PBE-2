import { ItensPedido } from "../models/ItensPedido.js";
import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepositores.js";
import { statusPed } from "../enums/statusPedido.js";

const pedidoController = {

    //pedido em geral
    criar: async (req, res) => {
        try {
            let { clienteId, itens } = req.body;

            const itensPedido = itens.map(item => ItensPedido.criar({
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                valorItem: item.valorItem
            }));

            const subTotal = ItensPedido.calcularSubTotalItens(itensPedido);
            const pedido = Pedido.criar({ clienteId, subTotal, status: statusPed.ABERTO });

            const result = await pedidoRepository.criar(pedido, itensPedido);

            res.status(201).json({ result });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await pedidoRepository.selecionar();

            return res.status(200).json(result);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao listar",
                error: error.message
            });
        }
    },

    //item por item
    adicionarItem: async (req, res) => {
        try {
            const { pedidoId } = req.params;
            const item = req.body;

            await pedidoRepository.adicionarItem(pedidoId, item);

            res.status(200).json({ message: "Item adicionado" });

        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },

    editarItem: async (req, res) => {
        try {
            const { itemId } = req.params;
            const { quantidade } = req.body;

            await pedidoRepository.editarItem(itemId, quantidade);

            res.status(200).json({ message: "Item atualizado" });

        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },

    deletarItem: async (req, res) => {
        try {
            const { itemId } = req.params;

            await pedidoRepository.deletarItem(itemId);

            res.status(200).json({ message: "Item removido" });

        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },
//status do pedido
    alterarStatus: async (req, res) => {
        try {
            const { pedidoId } = req.params;
            const { status } = req.body;

            await pedidoRepository.alterarStatus(pedidoId, status);

            res.status(200).json({ message: "Status atualizado" });

        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
        }
    },
};

export default pedidoController;