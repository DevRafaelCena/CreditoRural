const axios = require('axios');


async function validarCEP(cep) {
  try {

    if(!cep) return { valid: false, message: 'CEP não informado.' };

    // tirar os caracteres especiais
    const cepTratado = cep.replace(/\D/g, '');

    const url = `https://viacep.com.br/ws/${cepTratado}/json/`
    
    const response = await axios.get(url);  

    if(response.data.erro) return { valid: false, message: 'CEP não encontrado.' };

    const { cep: viaCepCep, uf } = response.data;   

    return { valid: true, estado: uf };

   
  } catch (error) {

    console.log('Erro ao validar o CEP:', error);

    return { valid: false, message: 'Erro ao validar o CEP.' };
  }
}

module.exports = {
  validarCEP,
};
