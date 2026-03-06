const OrderModel = require('../models/orderModel');
let orders = []; // Banco de dados em memória

// --- CRIAR (POST) ---
exports.createOrder = (req, res) => {
    try {
        const mappedOrder = OrderModel.mapFromRequest(req.body);
        orders.push(mappedOrder);
        res.status(201).json(mappedOrder);
    } catch (error) {
        res.status(400).json({ error: "Erro ao processar mapping" });
    }
};

// --- BUSCAR POR ID (GET) ---
exports.getOrderById = (req, res) => {
    const order = orders.find(o => o.orderId === req.params.id);
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
    res.status(200).json(order);
};

// --- LISTAR TODOS (GET) ---
exports.listAll = (req, res) => res.status(200).json(orders);

// --- ATUALIZAR (PUT) ---
exports.updateOrder = (req, res) => {
    const index = orders.findIndex(o => o.orderId === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Pedido não encontrado para atualizar" });
    
    // Atualiza os dados mantendo o ID original
    orders[index] = { ...orders[index], ...req.body };
    res.status(200).json({ message: "Pedido atualizado!", order: orders[index] });
};

// --- DELETAR (DELETE) ---
exports.deleteOrder = (req, res) => {
    const initialLength = orders.length;
    orders = orders.filter(o => o.orderId !== req.params.id);
    
    if (orders.length === initialLength) {
        return res.status(404).json({ message: "Pedido não encontrado para deletar" });
    }
    res.status(200).json({ message: "Pedido deletado com sucesso!" });
};