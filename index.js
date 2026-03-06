const express = require('express');
const app = express();
app.use(express.json());

// Simulando um banco de dados na memória (Array)
let orders = [];

// Rota inicial para não dar mais "Cannot GET /"
app.get('/', (req, res) => {
    res.send('API do Desafio Avantia está ONLINE! Use o endpoint /order para postar.');
});

// 1. Rota POST: Criar Pedido (com MAPPING)
app.post('/order', (req, res) => {
    try {
        const raw = req.body;

        // TRANSFORMAÇÃO DOS DADOS (O Mapping solicitado)
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
        console.log("✅ Pedido recebido e mapeado:", mappedOrder);
        res.status(201).json(mappedOrder);
    } catch (error) {
        res.status(400).json({ error: "Erro ao processar dados", message: error.message });
    }
});

// 2. Rota GET: Buscar por ID
app.get('/order/:orderId', (req, res) => {
    const order = orders.find(o => o.orderId === req.params.orderId);
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
    res.json(order);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`💡 Dica: O banco de dados está em modo MEMÓRIA para facilitar o seu teste.`);
});