import { connection } from "../config/Database.js";

const clienteRepository = {

    criar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            // CLIENTE
            const sqlCli = 'INSERT INTO clientes (nome, cpf) VALUES (?, ?)';
            const valuesCli = [cliente.Nome, cliente.cpf];
            const [rowsCli] = await conn.execute(sqlCli, valuesCli);

            const clienteId = rowsCli.insertId;

            // TELEFONE
            const sqlTel = 'INSERT INTO telefones (ClienteId, NumeroTel) VALUES (?, ?)';
            const valuesTel = [clienteId, telefone.numero];
            await conn.execute(sqlTel, valuesTel);

            // ENDEREÇO
            const sqlEnd = `
                INSERT INTO enderecos 
                (ClienteId, CEP, Logradouro, Numero, Complemento, Bairro, Cidade, UF) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const valuesEnd = [
                clienteId,
                endereco.cep,
                endereco.logradouro,
                endereco.numero,
                endereco.complemento,
                endereco.bairro,
                endereco.cidade,
                endereco.uf
            ];

            await conn.execute(sqlEnd, valuesEnd);

            await conn.commit();

            return clienteId;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    editar: async (telefone, endereco, idCliente) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            // TELEFONE
            const sqlTel = `
                UPDATE telefones 
                SET NumeroTel = ? 
                WHERE ClienteId = ?
            `;
            const valuesTel = [telefone.telefone, idCliente];
            const [rowsTel] = await conn.execute(sqlTel, valuesTel);

            // ENDEREÇO
            const sqlEnd = `
                UPDATE enderecos 
                SET CEP = ?, Logradouro = ?, Numero = ?, Complemento = ?, Bairro = ?, Cidade = ?, UF = ? 
                WHERE ClienteId = ?
            `;
            const valuesEnd = [
                endereco.cep,
                endereco.logradouro,
                endereco.numero,
                endereco.complemento,
                endereco.bairro,
                endereco.cidade,
                endereco.uf,
                idCliente
            ];

            const [rowsEnd] = await conn.execute(sqlEnd, valuesEnd);

            await conn.commit();

            return { rowsTel, rowsEnd };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            // Deletar dependentes primeiro (evita erro de FK)
            await conn.execute('DELETE FROM telefones WHERE ClienteId = ?', [id]);
            await conn.execute('DELETE FROM enderecos WHERE ClienteId = ?', [id]);

            // Depois o cliente
            const [rows] = await conn.execute('DELETE FROM clientes WHERE id = ?', [id]);

            await conn.commit();

            return rows;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionar: async () => {
        const sql = `
            SELECT 
                c.id,
                c.nome,
                c.cpf,
                t.NumeroTel,
                e.CEP,
                e.Logradouro,
                e.Numero,
                e.Complemento,
                e.Bairro,
                e.Cidade,
                e.UF
            FROM clientes c
            INNER JOIN telefones t ON c.id = t.ClienteId
            INNER JOIN enderecos e ON c.id = e.ClienteId
        `;

        const [rows] = await connection.execute(sql);
        return rows;
    },

};

export default clienteRepository;