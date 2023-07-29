const { EstadoPreco } = require('../db/models');

async function buscarEstadoPorUf(uf) {
  try {

    const estado = await EstadoPreco.findOne({
      where: { uf: uf } 
    });

    if(!estado) throw new Error('Estado não encontrado.');

    return estado;
  } catch (error) {   
       
    throw new Error(error.message);
  }
}

module.exports = { buscarEstadoPorUf };
