const { Emprestimos,Produtores } = require('../db/models');
const { calcularValorEmprestimoComJuros } = require('./calculoEmprestimo');

async function criarEmprestimo(produtor, qtd_sacas, valorTotal, data_quitacao, estado) {
    try{
        const emprestimo = await Emprestimos.create({
            produtor_id: produtor.id,
            qtd_sacas,
            valor_total: valorTotal,
            data_quitacao,
            estado,
        });
        return emprestimo;
    }catch(error){
        throw new Error('Erro ao realizar o emprestimo.');
    }
}

async function retornaUltimosEmprestimos() {

    try{

        const emprestimos = await Emprestimos.findAll({
            limit: 10,
            order: [['id', 'DESC']],
            include: [{ model: Produtores, as: 'Produtor' }]
        });

        if (!emprestimos || emprestimos.length === 0) {
            return []; 
        }

        const emprestimosOrdenados = emprestimos.sort((a, b) => new Date(a.data_quitacao) - new Date(b.data_quitacao));
        
        const formataRetorno = emprestimosOrdenados.map(emprestimo => {
            return {
              nomeProdutor: emprestimo.Produtor.nome,
              estado: emprestimo.Produtor.estado,
              qtdSacasCafe: emprestimo.qtd_sacas,
              valorTotalEmprestimo: emprestimo.valor_total,
              dataVencimento: emprestimo.data_quitacao
            };
          });     

        return formataRetorno;

    }catch(error){
        console.log(error)
        throw new Error('Erro ao buscar os emprestimos.');
    }
}

module.exports = { criarEmprestimo , retornaUltimosEmprestimos };
