import { connection } from "../config/Database.js";

const pedidoRepository = {

    criar: async (pedido, itens) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            if (!pedido.clienteId || pedido.subTotal === undefined || !pedido.status) {
                throw new Error("Dados do pedido inválidos");
            }

            const sqlPed = 'INSERT INTO pedidos (ClienteId, SubTtotal, Status) VALUES (?, ?, ?)';
            const valuesPed = [pedido.clienteId, pedido.subTotal ?? null, pedido.status];

            const [rowsPed] = await conn.execute(sqlPed, valuesPed);

            if (!itens || itens.length === 0) {
                throw new Error("Pedido sem itens");
            }

            for (const item of itens) {
                if (
                    item.produtoId === undefined ||
                    item.quantidade === undefined ||
                    item.valorItem === undefined
                ) {
                    throw new Error("Item com dados inválidos");
                }

                const sqlItens = 
                `INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?, ?, ?, ?)`;

                const valuesItens = [rowsPed.insertId,item.produtoId,item.quantidade,item.valorItem];

                await conn.execute(sqlItens, valuesItens);
            }

            await conn.commit();
            return { rowsPed };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM pedidos';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    //item por item
    adicionarItem: async (pedidoId, item) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            await conn.execute(
                `INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem)
                 VALUES (?, ?, ?, ?)`,
                [pedidoId, item.produtoId, item.quantidade, item.valorItem]
            );

            // recalcular subtotal
            const [itens] = await conn.execute(
                `SELECT Quantidade, ValorItem FROM itens_pedidos WHERE PedidoId = ?`,
                [pedidoId]
            );

            const subTotal = itens.reduce(
                (total, i) => total + (i.Quantidade * i.ValorItem), 0 //serve como valor inicial, fazendo a conta com valor inicial de 0 
            );

            await conn.execute(
                `UPDATE pedidos SET SubTtotal = ? WHERE id = ?`,
                [subTotal, pedidoId]
            );

            await conn.commit();

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    editarItem: async (itemId, quantidade) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            await conn.execute(
                `UPDATE itens_pedidos SET Quantidade = ? WHERE id = ?`,
                [quantidade, itemId]
            );

            const [[item]] = await conn.execute(
                `SELECT PedidoId FROM itens_pedidos WHERE id = ?`,
                [itemId]
            );

            const pedidoId = item.PedidoId;

            const [itens] = await conn.execute(
                `SELECT Quantidade, ValorItem FROM itens_pedidos WHERE PedidoId = ?`,
                [pedidoId]
            );

            const subTotal = itens.reduce(
                (total, i) => total + (i.Quantidade * i.ValorItem), 0
            );

            await conn.execute(
                `UPDATE pedidos SET SubTtotal = ? WHERE id = ?`,
                [subTotal, pedidoId]
            );

            await conn.commit();

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletarItem: async (itemId) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const [[item]] = await conn.execute(
                `SELECT PedidoId FROM itens_pedidos WHERE id = ?`,
                [itemId]
            );

            const pedidoId = item.PedidoId;

            await conn.execute(
                `DELETE FROM itens_pedidos WHERE id = ?`,
                [itemId]
            );

            const [itens] = await conn.execute(
                `SELECT Quantidade, ValorItem FROM itens_pedidos WHERE PedidoId = ?`,
                [pedidoId]
            );

            const subTotal = itens.reduce(
                (total, i) => total + (i.Quantidade * i.ValorItem), //i é cada item que vai ser feito a conta no arrway
                0
            );

            await conn.execute(
                `UPDATE pedidos SET SubTtotal = ? WHERE id = ?`,
                [subTotal, pedidoId]
            );

            await conn.commit();

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    //mudar os status
    alterarStatus: async (pedidoId, status) => {
        await connection.execute(
            `UPDATE pedidos SET Status = ? WHERE id = ?`,
            [status, pedidoId]
        );
    }
};

export default pedidoRepository;