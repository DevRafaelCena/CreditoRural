const { calcularValorEmprestimoComJuros } = require('../src/services/calculoEmprestimo');

describe('calcularValorEmprestimoComJuros', () => {

    test('Deve calcular o valor do empréstimo com juros corretamente', () => {
        const valorTotal = calcularValorEmprestimoComJuros(10, 1050, '2023-09-29');
        expect(valorTotal).toBe(10924.20);
    });

    test('Deve lançar um erro se algum parâmetro estiver faltando', () => {      
      expect(() => calcularValorEmprestimoComJuros()).toThrow('Erro ao calcular o valor do empréstimo.');
      expect(() => calcularValorEmprestimoComJuros(10)).toThrow('Erro ao calcular o valor do empréstimo.');
      expect(() => calcularValorEmprestimoComJuros(10, 1050)).toThrow('Erro ao calcular o valor do empréstimo.');
    });
})
  
