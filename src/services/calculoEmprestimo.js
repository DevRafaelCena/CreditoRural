function calcularValorEmprestimoComJuros(quantidadeSacas, precoSaca, dataQuitacao) {
    try{
        const jurosMensais = 0.02;

        const hoje = new Date();
        const dataQuitacaoFormatada = new Date(dataQuitacao);
        
        const diferencaMeses = (dataQuitacaoFormatada.getFullYear() - hoje.getFullYear()) * 12 +
            dataQuitacaoFormatada.getMonth() - hoje.getMonth();
       
        const valorTotalEmprestimo = quantidadeSacas * precoSaca * (1 + jurosMensais) ** diferencaMeses;
    
        return valorTotalEmprestimo;

    }catch(error){
        throw new Error("Erro ao calcular o valor do empréstimo.");
    }   

  }
  
  module.exports = { calcularValorEmprestimoComJuros };
  