// Importando express
import express from 'express';

// Definindo a porta do servidor
const PORT = 8080;

// Inicializando o array de itens
let listaItens = [];

// Criando uma instância do express
const app = express();

// Habilitando o uso de JSON no corpo das requisições
app.use(express.json());

// Rota para paginação de itens
app.get('/paginacao', async (req, res) => {
    try {
        // Recuperando os parâmetros da query
        const { page = 1, limit = 5 } = req.query;

        // Lógica para recuperar os itens paginados (exemplo: consulta ao banco de dados)
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const itensPaginados = listaItens.slice(startIndex, endIndex);

        res.status(200).send({ message: 'Itens retornados com sucesso!', data: itensPaginados });
    } catch (error) {
        res.status(500).send({ message: 'Erro interno no servidor.' });
    }
});

// Iniciando o servidor na porta especificada
app.listen(PORT, () =>
    console.log(`Servidor iniciado na porta ${PORT}`)
);
