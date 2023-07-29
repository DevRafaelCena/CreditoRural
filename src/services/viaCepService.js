const axios = require('axios');

async function validarCEP(cep) {
  try {

    if(!cep){
      throw new Error('CEP não informado.');
    }

    // tirar os caracteres especiais
    const cepTratado = cep.replace(/\D/g, '');

    const url = `https://viacep.com.br/ws/${cepTratado}/json/`
    
    const response = await axios.get(url); 
    
    if (response.status !== 200) {
      throw new Error('Erro ao validar o CEP.');
    }

    if(response.data.erro){ 
       throw new Error('CEP inválido.');
    };    

    const { cep: viaCep , uf } = response.data; 

    return { valid: true, estado: uf, cep:viaCep };

   
  } catch (error) {       

    if(error.message){ 
      throw new Error(error.message);
    };
  }
}

module.exports = {
  validarCEP,
};
