const express = require('express');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
app.use(express.json());

// Rotas
app.use('/order', orderRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 API Profissional rodando na porta ${PORT}`));