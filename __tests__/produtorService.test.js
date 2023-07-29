const { buscarOuCriarProdutor } = require('../src/services/produtorService');
const { Produtores } = require('../src/db/models');

jest.mock('../src/db/models', () => ({
  Produtores: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe('buscarOuCriarProdutor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve buscar e retornar o produtor quando ele existe no banco de dados', async () => {
    const nome = 'João Cena';
    const cepValido = { cep: '12345678', estado: 'SP' };
    const estado = 'São Paulo';

    const produtorMock = {
      id: 1,
      nome: 'João Cena',
      cep: '12345678',
      estado: 'SP',
    };

    Produtores.findOne.mockResolvedValue(produtorMock);

    const produtor = await buscarOuCriarProdutor(nome, cepValido, estado);

    expect(produtor).toEqual(produtorMock);
    expect(Produtores.findOne).toHaveBeenCalledWith({ where: { nome, cep: cepValido.cep } });
    expect(Produtores.create).not.toHaveBeenCalled();

  });

  test('Deve criar e retornar o produtor quando ele não existe no banco de dados', async () => {
    const nome = 'Rafael Cena';
    const cepValido = { cep: '12345678', estado: 'SP' };
    const estado = 'São Paulo';

    const produtorCriadoMock = {
      id: 1,
      nome: 'Rafael Cena',
      cep: '12345678',
      estado: 'SP',
    };

    Produtores.findOne.mockResolvedValue(null);
    Produtores.create.mockResolvedValue(produtorCriadoMock);

    const produtor = await buscarOuCriarProdutor(nome, cepValido, estado);

    expect(produtor).toEqual(produtorCriadoMock);
    expect(Produtores.findOne).toHaveBeenCalledWith({ where: { nome, cep: cepValido.cep } });
    expect(Produtores.create).toHaveBeenCalledWith({ nome, cep: cepValido.cep, estado });
  });

  test('Deve lançar um erro quando ocorre um erro ao buscar ou criar o produtor no banco de dados', async () => {
    const nome = 'Rafael Cena';
    const cepValido = { cep: '12345678', estado: 'SP' };
    const estado = 'São Paulo';

    Produtores.findOne.mockRejectedValue(new Error('Erro de banco de dados'));

    await expect(buscarOuCriarProdutor(nome, cepValido, estado)).rejects.toThrow(
      'Erro ao buscar ou criar o produtor.'
    );
    expect(Produtores.findOne).toHaveBeenCalledWith({ where: { nome, cep: cepValido.cep } });
    expect(Produtores.create).not.toHaveBeenCalled();
    
  });
});
