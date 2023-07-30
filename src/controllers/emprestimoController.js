// emprestimoController.js
const { validarCEP } = require('../services/viaCepService');
const { buscarEstadoPorUf } = require('../services/estado');
const { buscarOuCriarProdutor } = require('../services/produtorService');
const { criarEmprestimo , retornaUltimosEmprestimos} = require('../services/emprestimoService');
const { calcularValorEmprestimoComJuros } = require('../services/calculoEmprestimo');
const { validaData } = require('../services/validarData');


async function realizarEmprestimo(req, res) {
  try {

    const { nome, cep, qtd_sacas, data_quitacao } = req.body;

    // se a qdt de sacas for menor que 1 ou não for inteiro
    if (qtd_sacas < 1 || !Number.isInteger(qtd_sacas)) {
      throw new Error('Quantidade de sacas inválida.');
    }

    const data_quitacao_formatada = validaData(data_quitacao);

    const cepValido = await validarCEP(cep);

    const estado = cepValido.estado;

    const estadoPreco = await buscarEstadoPorUf(estado);
    
    const produtor = await buscarOuCriarProdutor(nome, cepValido, estadoPreco.nome);

    const valor = calcularValorEmprestimoComJuros(qtd_sacas, estadoPreco.preco, data_quitacao_formatada);    
    
    await criarEmprestimo(produtor, qtd_sacas, valor, data_quitacao_formatada, estado);

    return res.status(201).json({
      nomeProdutor: produtor.nome,
      estado:estadoPreco.nome,
      qtdSacasCafe:qtd_sacas,
      valorTotalEmprestimo: valor,
      dataVencimento: data_quitacao
    });

  } catch (error) {  
    console.log(error)
    if(error.message) return res.status(400).json({ error: error.message });

    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}


async function retornaEmprestimos(req, res) {

  try {

    console.log('retornaEmprestimos')

    const emprestimos = await retornaUltimosEmprestimos();

    return res.status(200).json(emprestimos);

  } catch (error) {
    console.log(error)
    if(error.message) return res.status(400).json({ error: error.message });

    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }

}

module.exports = {
  realizarEmprestimo,
  retornaEmprestimos
};
