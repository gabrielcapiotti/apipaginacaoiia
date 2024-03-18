// Importando express
import express from 'express';

// Definindo a porta do servidor
const PORT = 8888;

// Inicializando o array de itens
let listaItens = [];

// Criando uma instância do express
const app = express();

// Habilitando o uso de JSON no corpo das requisições
app.use(express.json());

// Rota para adicionar um novo item
app.post('/itens', (req, res) => {
    try {
        const { nome, valor } = req.body;
        // Verifica se os campos obrigatórios estão presentes
        if (!nome || !valor) {
            return res.status(400).send({ message: 'Nome e valor são obrigatórios.' });
        }
        const novoItem = { nome, valor };
        listaItens.push(novoItem);
        res.status(201).send({ message: 'Item adicionado com sucesso!', data: novoItem });
    } catch (error) {
        res.status(500).send({ message: 'Erro interno no servidor.' });
    }
});

// Rota para listar todos os itens
app.get('/itens', (req, res) => {
    try {
        res.status(200).send({ message: 'Itens retornados com sucesso!', data: listaItens });
    } catch (error) {
        res.status(500).send({ message: 'Erro interno no servidor.' });
    }
});

// Rota para paginação de itens
app.get('/itens/paginacao', async (req, res) => {
    try {
        // Recuperando os parâmetros da query
        const { page = 1, limit = 5 } = req.query;

        // Lógica para calcular a quantidade total de páginas
        const totalItems = listaItens.length;
        const totalPages = Math.ceil(totalItems / limit);

        // Calcula o índice inicial e final dos itens na página atual
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const itensPaginados = listaItens.slice(startIndex, endIndex);

        res.status(200).send({ 
            message: 'Itens retornados com sucesso!',
            currentPage: parseInt(page),
            totalPages: totalPages,
            hasNextPage: parseInt(page) < totalPages,
            hasPreviousPage: parseInt(page) > 1,
            data: itensPaginados
        });
    } catch (error) {
        res.status(500).send({ message: 'Erro interno no servidor.' });
    }
});

// Iniciando o servidor na porta especificada
app.listen(PORT, () =>
    console.log(`Servidor iniciado na porta ${PORT}`)
);
