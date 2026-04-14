import { connection } from "../config/Database.js"; 

const produtoRepository = {
    criar: async (produto) => {
        const sql = 'INSERT INTO produto (idCategoria, nome, valor, caminhoImagem) VALUES (?,?,?,?)';
        const values = [produto.IdCategoria, produto.Nome, produto.Valor, produto.CaminhoImagem];
        const [rows] = await connection.execute(sql, values); 
        return rows; 
    },
    editar: async (produto) => {
        const sql = 'UPDATE produto SET Nome =?,Valor=? WHERE Id=?;';
        const values = [produto.Nome, produto.Valor, produto.Id];
        const [rows] = await connection.execute(sql, values); 
        return rows; 
    },
     deletar: async (Id) => {
        const sql = 'DELETE FROM produto WHERE id = ?;';
        const values = [Id];
        const [rows] = await connection.execute(sql, values); 
        return rows; 
    },
    selecionar: async () => {
        const sql = 'SELECT * FROM produto'; 
        const [rows] = await connection.execute(sql); 
        return rows;
    },

}

export default produtoRepository; 