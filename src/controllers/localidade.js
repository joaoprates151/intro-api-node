const db = require(/dataBase/connection.js);

module.exports = {
    async listarLocalidades(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista de Localidades',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        }    
    }
}