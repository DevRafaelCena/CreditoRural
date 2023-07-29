const { buscarEstadoPorUf } = require('../src/services/estado');
const { EstadoPreco } = require('../src/db/models');

jest.mock('../src/db/models', () => ({
  EstadoPreco: {
    findOne: jest.fn(),
  },
}));

describe('buscarEstadoPorUf', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve buscar e retornar o estado quando ele existe no banco de dados', async () => {
    const uf = 'SP';
    const estadoMock = {
      uf: 'SP',
      nome: 'São Paulo',
      preco: 1050.00,
    };

    EstadoPreco.findOne.mockResolvedValue(estadoMock);

    const estado = await buscarEstadoPorUf(uf);

    expect(estado).toEqual(estadoMock);
    expect(EstadoPreco.findOne).toHaveBeenCalledWith({ where: { uf: uf } });
  });

  test('Deve lançar um erro quando o estado não é encontrado no banco de dados', async () => {
    const uf = 'RJ';

    EstadoPreco.findOne.mockResolvedValue(null);

    await expect(buscarEstadoPorUf(uf)).rejects.toThrow('Estado não encontrado.');
    expect(EstadoPreco.findOne).toHaveBeenCalledWith({ where: { uf: uf } });
  });

  test('Deve lançar um erro quando ocorre um erro ao buscar o estado no banco de dados', async () => {
    const uf = 'SP';

    EstadoPreco.findOne.mockRejectedValue(new Error('Erro ao buscar o estado.'));

    await expect(buscarEstadoPorUf(uf)).rejects.toThrow('Erro ao buscar o estado.');
    expect(EstadoPreco.findOne).toHaveBeenCalledWith({ where: { uf: uf } });
  });
});
