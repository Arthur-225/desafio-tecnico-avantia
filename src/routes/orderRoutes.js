const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);          // CRIAR
router.get('/list', orderController.listAll);           // LISTAR
router.get('/:id', orderController.getOrderById);       // BUSCAR POR ID
router.put('/:id', orderController.updateOrder);        // ATUALIZAR
router.delete('/:id', orderController.deleteOrder);     // DELETAR

module.exports = router;