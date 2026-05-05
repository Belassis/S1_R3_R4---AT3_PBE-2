import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const pedidoRoutes = Router();

// pedido
pedidoRoutes.post('/', pedidoController.criar);
pedidoRoutes.get('/', pedidoController.selecionar);
pedidoRoutes.put('/:pedidoId/status', pedidoController.alterarStatus);

// itens
pedidoRoutes.post('/:pedidoId/itens', pedidoController.adicionarItem);
pedidoRoutes.put('/itens/:itemId', pedidoController.editarItem);
pedidoRoutes.delete('/itens/:itemId', pedidoController.deletarItem);

export default pedidoRoutes;