function validaData(dataString) {
    
    try{

        // Verifica se a string da data possui o formato correto (dd/mm/yyyy)
        const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = dataString.match(dataRegex);
    
        if (!match) {
            throw new Error('Data inválida');
        }
    
        const dia = parseInt(match[1], 10);
        const mes = parseInt(match[2], 10);
        const ano = parseInt(match[3], 10);
    
        const dataFormatada = new Date(ano, mes - 1, dia);
    
        if (isNaN(dataFormatada.getTime())) {    
            throw new Error('Data inválida');
        }
    
        return dataFormatada;
    }catch(error){
       throw new Error(error.message);
    }
    
  }

module.exports = { validaData };  
  