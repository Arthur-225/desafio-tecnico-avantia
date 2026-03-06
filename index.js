const express = require('express');
const app = express();
app.use(express.json());

// Banco de dados em memória (Array) para o teste rodar fácil
let orders = [];

// 1. Rota de Boas-vindas (Só para você ver que está online)
app.get('/', (req, res) => {
    res.send('🚀 API Avantia Online! Endpoints: /order (POST), /order/:id (GET/PUT/DELETE), /order/list (GET)');
});

// 2. CRIAR PEDIDO (POST) - COM MAPPING OBRIGATÓRIO
app.post('/order', (req, res) => {
    try {
        const raw = req.body;
        const mappedOrder = {
            orderId: raw.numeroPedido,
            value: raw.valorTotal,
            creationDate: new Date(raw.dataCriacao),
            items: raw.items.map(item => ({
                productId: parseInt(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };
        orders.push(mappedOrder);
        res.status(201).json(mappedOrder);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar pedido" });
    }
});

// 3. LISTAR TODOS (GET) - OPCIONAL
app.get('/order/list', (req, res) => {
    res.json(orders);
});

// 4. OBTER POR ID (GET) - OBRIGATÓRIO
app.get('/order/:orderId', (req, res) => {
    const order = orders.find(o => o.orderId === req.params.orderId);
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
    res.json(order);
});

// 5. ATUALIZAR PEDIDO (PUT) - OPCIONAL
app.put('/order/:orderId', (req, res) => {
    const index = orders.findIndex(o => o.orderId === req.params.orderId);
    if (index === -1) return res.status(404).json({ message: "Pedido não encontrado" });
    
    // Atualiza os dados (simples)
    orders[index] = { ...orders[index], ...req.body };
    res.json({ message: "Pedido atualizado!", order: orders[index] });
});

// 6. DELETAR PEDIDO (DELETE) - OPCIONAL
app.delete('/order/:orderId', (req, res) => {
    const initialLength = orders.length;
    orders = orders.filter(o => o.orderId !== req.params.orderId);
    
    if (orders.length === initialLength) return res.status(404).json({ message: "Pedido não encontrado" });
    res.json({ message: "Pedido deletado com sucesso!" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));