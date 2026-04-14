import { connection } from "../config/Database.js";

const clienteRepository = {

    criar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sqlCli = 'INSERT INTO clientes (nome, cpf) VALUES (?, ?)';
            const valuesCli = [cliente.nome, cliente.cpf];
            const [rowsCli] = await conn.execute(sqlCli, valuesCli);

            const sqlTel = 'INSERT INTO telefones (ClienteId, NumeroTel) VALUES (?, ?)';
            const valuesTel = [rowsCli.insertId, telefone.numero];
            await conn.execute(sqlTel, valuesTel);

            const sqlEnd = `
                INSERT INTO enderecos 
                (ClienteId, CEP, Logradouro, Numero, Complemento, Bairro, Cidade, UF) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const valuesEnd = [
                rowsCli.insertId, endereco.cep, endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf
            ];

            await conn.execute(sqlEnd, valuesEnd);

            await conn.commit(); 

            return rowsCli.insertId;

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

            // const sqlCli = 'UPDATE clientes SET nome = ?, cpf = ? WHERE id = ?';
            // const valuesCli = [cliente.nome, cliente.cpf, idCliente];
            // const [rowsCli] = await conn.execute(sqlCli, valuesCli);

            const sqlTel = 'UPDATE telefones SET NumeroTel = ? WHERE ClienteId = ?';
            const valuesTel = [telefone.telefone, idCliente];
            const [rowsTel] = await conn.execute(sqlTel, valuesTel);

            const sqlEnd = 'UPDATE enderecos SET CEP = ?, Logradouro = ?, Numero = ?, Complemento = ?, Bairro = ?, Cidade = ?, UF = ? WHERE ClienteId = ?';
            const valuesEnd = [endereco.cep, endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf, idCliente];
            const [rowsEnd] = await conn.execute(sqlEnd, valuesEnd);

            await conn.commit(); 

            return {rowsTel, rowsEnd};

        } catch (error) {
            await conn.rollback(); 
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM clientes WHERE id = ?';
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    },

    selecionar: async () => {
        // usar o INNER JOIN para "juntar" as dados das tabelas
        const sql = 'SELECT * FROM clientes';
        const [rows] = await connection.execute(sql);
        return rows;
    },

};

export default clienteRepository;
