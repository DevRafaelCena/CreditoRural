const { Produtores } = require('../db/models');

async function buscarOuCriarProdutor(nome, cepValido, estado) {

    try{
        const produtor = await Produtores.findOne({
            where: { nome, cep: cepValido.cep },
          });

        if (!produtor) {
            return await Produtores.create({ nome, cep: cepValido.cep, estado });
        }
        return produtor;
    }catch(error){
        throw new Error('Erro ao buscar ou criar o produtor.');
    }
 
}

module.exports = { buscarOuCriarProdutor };
