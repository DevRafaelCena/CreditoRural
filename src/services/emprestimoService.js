const { Emprestimos, Produtores } = require('../db/models');
const { calcularValorEmprestimoComJuros } = require('./calculoEmprestimo');
const { loadSequelize } = require('../db/index'); // Importe a função loadSequelize do seu arquivo de configuração

let sequelize = null;

async function criarEmprestimo(produtor, qtd_sacas, valorTotal, data_quitacao, estado) {
  try {
    if (!sequelize) {
      sequelize = await loadSequelize();
    }

    const emprestimo = await Emprestimos.create(
      {
        produtor_id: produtor.id,
        qtd_sacas,
        valor_total: valorTotal,
        data_quitacao,
        estado,
      },
      { sequelize } // Passe a instância do Sequelize como segundo argumento para garantir que as consultas usem a mesma conexão
    );

    return emprestimo;
  } catch (error) {
    throw new Error('Erro ao realizar o emprestimo.');
  }
}

async function retornaUltimosEmprestimos() {
  try {
    if (!sequelize) {
      sequelize = await loadSequelize();
    }

    const emprestimos = await Emprestimos.findAll({
      limit: 10,
      order: [['id', 'DESC']],
      include: [{ model: Produtores, as: 'Produtor' }],
      sequelize, // Passe a instância do Sequelize como opção para a consulta
    });

    if (!emprestimos || emprestimos.length === 0) {
      return [];
    }

    const emprestimosOrdenados = emprestimos.sort(
      (a, b) => new Date(a.data_quitacao) - new Date(b.data_quitacao)
    );

    const formataRetorno = emprestimosOrdenados.map((emprestimo) => {
      return {
        nomeProdutor: emprestimo.Produtor.nome,
        estado: emprestimo.Produtor.estado,
        qtdSacasCafe: emprestimo.qtd_sacas,
        valorTotalEmprestimo: emprestimo.valor_total,
        dataVencimento: emprestimo.data_quitacao,
      };
    });

    return formataRetorno;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao buscar os emprestimos.');
  }
}

module.exports = { criarEmprestimo, retornaUltimosEmprestimos };
