import express from 'express';
import cors from 'cors';

// Definindo a porta do servidor
const PORT = 8888;

// Inicializando o array de itens
let listaItens = [];

// Criando uma instância do express
const app = express();

// Habilitando o uso de JSON no corpo das requisições
app.use(express.json());
app.use(cors());
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
        let { page = 1, limit = 5 } = req.query;
        
        // Convertendo os parâmetros para números inteiros
        page = parseInt(page);
        limit = parseInt(limit);

        // Verificando se o limite é maior que zero, caso contrário, define um valor padrão de 5
        if (isNaN(limit) || limit <= 0) {
            limit = 5;
        }

        // Lógica para calcular a quantidade total de páginas
        const totalItems = listaItens.length;
        const totalPages = Math.ceil(totalItems / limit);

        // Calcula o índice inicial e final dos itens na página atual
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const itensPaginados = listaItens.slice(startIndex, endIndex);

        res.status(200).send({ 
            message: 'Itens retornados com sucesso!',
            currentPage: page,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
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
