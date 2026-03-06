const OrderModel = require('../models/orderModel');
let orders = []; // Banco em memória

exports.createOrder = (req, res) => {
  try {
    const newOrder = OrderModel.mapFromRequest(req.body);
    orders.push(newOrder);
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(400).json({ error: "Erro no mapeamento dos dados" });
  }
};

exports.getOrderById = (req, res) => {
  const order = orders.find(o => o.orderId === req.params.id);
  if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
  return res.status(200).json(order);
};

exports.listAll = (req, res) => res.status(200).json(orders);