import { Router } from "express";
import produtoController from "../controllers/produtoController.js";
import upload from "../middlewares/upload.js";

const produtoRoutes = Router();

produtoRoutes.post('/', upload.single('CaminhoImagem'),produtoController.criar);
produtoRoutes.put('/:id', produtoController.editar);
produtoRoutes.delete('/:id', produtoController.deletar);
produtoRoutes.get('/', produtoController.selecionar);

export default produtoRoutes; 