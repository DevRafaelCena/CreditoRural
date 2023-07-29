function calcularValorEmprestimoComJuros(quantidadeSacas, precoSaca, dataQuitacao) {
    try{

        if(!quantidadeSacas || !precoSaca || !dataQuitacao) throw new Error("Erro ao calcular o valor do empréstimo.");

        const jurosMensais = 0.02;

        const hoje = new Date();
        const dataQuitacaoFormatada = new Date(dataQuitacao);
        
        const diferencaMeses = (dataQuitacaoFormatada.getFullYear() - hoje.getFullYear()) * 12 +
            dataQuitacaoFormatada.getMonth() - hoje.getMonth();
       
        const valorTotalEmprestimo = quantidadeSacas * precoSaca * (1 + jurosMensais) ** diferencaMeses;

        // Arredonda o valor para duas casas decimais e retorna
        return Math.round(valorTotalEmprestimo * 100) / 100;
    

    }catch(error){
        throw new Error("Erro ao calcular o valor do empréstimo.");
    }   

  }
  
  module.exports = { calcularValorEmprestimoComJuros };
  