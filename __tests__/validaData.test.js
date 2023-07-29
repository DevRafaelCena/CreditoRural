const { validaData } = require('../src/services/validarData');

describe('validaData', () => {

  test('Deve retornar a data formatada para uma data válida', () => {
    const dataString = '29/07/2023';
    const dataEsperada = new Date(2023, 6, 29);
    expect(validaData(dataString)).toEqual(dataEsperada);
  });

  test('Deve lançar um erro para uma data inválida com formato incorreto', () => {
    const dataString = '2023-07-29'; // Formato incorreto
    expect(() => validaData(dataString)).toThrow('Data inválida');
  });

  test('Deve lançar um erro para uma data com dia, mês ou ano inválido', () => {
  
    const dataString1 = '40/02/2023';
    expect(() => validaData(dataString1)).toThrow('Data inválida');
   
    const dataString2 = '29/13/2023';
    expect(() => validaData(dataString2)).toThrow('Data inválida');

    
    const dataString3 = '29/07/0000';
    expect(() => validaData(dataString3)).toThrow('Data inválida');
  });
});
