const { validarCEP  } = require('../src/services/viaCepService');
const axios = require('axios');

jest.mock('axios');

describe('Busca cep', () => {

  test('Deve retornar o estado e CEP corretos para um CEP válido', async () => {
    const mockCep = '12345678';
    const mockResponse = {
      status: 200,
      data: {
        cep: mockCep,
        uf: 'SP',
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    const resultado = await validarCEP(mockCep);

    expect(resultado).toEqual({ valid: true, estado: 'SP', cep: mockCep });
  });

  test('Deve lançar um erro para um CEP inválido', async () => {
    const mockCep = '12345678';
    const mockResponse = {
      status: 200,
      data: {
        erro: true,
      },
    };
  
    axios.get.mockResolvedValue(mockResponse);
  
    await expect(validarCEP(mockCep)).rejects.toThrow('CEP inválido.');
  });

  test('Deve lançar um erro para um CEP que não retorna o status 200', async () => {
    const mockCep = '12345678';
    const mockResponse = {
      status: 400,
      data: {},
    };
  
    axios.get.mockResolvedValue(mockResponse);
  
    await expect(validarCEP(mockCep)).rejects.toThrow('Erro ao validar o CEP.');
  });

  test('Deve lançar um erro para um CEP não informado', async () => {
    await expect(validarCEP()).rejects.toThrow('CEP não informado.');
  });

  test('Deve lançar um erro para um erro na requisição', async () => {
    const mockCep = '12345678';
  
    axios.get.mockRejectedValue(new Error('Erro na requisição.'));
  
    await expect(validarCEP(mockCep)).rejects.toThrow('Erro na requisição.');
  });


});
