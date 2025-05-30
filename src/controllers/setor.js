const db = require('../dataBase/connection');

module.exports = {
    async listarSetores(request, response) {
        try {

            const sql = 'SELECT id_setor, nm_setor FROM bd_tcc_infonet_224_monit_prev.setor;'

            const [rows] = await db.query(sql)
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista de Setores',
                itens: rows.length,
                dados: rows,
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        } 
    },

    async atualizarSetores(request, response) {
        try {

            const {NM_setor} = request.body
            const {ID_Setor} = request.params

            const sql = 'update setor set NM_setor = ? where ID_Setor = ?'
            console.log(NM_setor)

            const values = [NM_setor, ID_Setor]

            const dadosAtualizados = await db.query(sql, values)
             
            return response.status(200).json({
                sucesso: true,
                mensagem: `Setor ${ID_Setor} atualizado com sucesso!`,
                dados: dadosAtualizados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        } 
    },

    async inserirSetores(request, response) {
        try {

            const {NM_Setor} = request.body

            const sql = 'insert into setor (NM_Setor) values (?)'

            console.log(NM_Setor);
            

            const values = [NM_Setor]
            

            const [results] = await db.query(sql, values)

            const setorId = results.insertId

            return response.status(200).json({

                sucesso: true,
                mensagem: 'Setor Inserido',
                dados: setorId
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        } 
    },

    async excluirSetores(request, response) {
        try {
            const {ID_Setor} = request.params

            const sql = 'delete from setor where ID_Setor = ?'

            const values = [ID_Setor]
            

            const [results] = await db.query(sql, values)

            if( results.affectedRows === 0 )
            {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Setor ${ID_Setor} não encontrado!`,
                    dados: null
                })
            }

            return response.status(200).json({

                sucesso: true,
                mensagem: `Setor ${ID_Setor} excluido com sucesso!`,
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