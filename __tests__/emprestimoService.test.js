const {
    criarEmprestimo,
    retornaUltimosEmprestimos,
  } = require('../src/services/emprestimoService');
  const { Emprestimos, Produtores } = require('../src/db/models');
  
  jest.mock('../src/db/models', () => ({
    Emprestimos: {
      create: jest.fn(),
      findAll: jest.fn(),
    },
    Produtores: {
      findOne: jest.fn(),
    },
  }));
  
  describe('criarEmprestimo', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('Deve criar um empréstimo com os dados fornecidos', async () => {
        const produtorMock = { id: 1 };
        const qtd_sacas = 10;
        const valorTotal = 1000.0;
        const data_quitacao = new Date();
        const estado = 'SP';
      
        const emprestimoCriadoMock = {
          id: 1,
          produtor_id: 1,
          qtd_sacas: 10,
          valor_total: 1000.0,
          data_quitacao: new Date(),
          estado: 'SP',
        };
      
        // Implementação da função de mock para Produtores.findOne
        Produtores.findOne.mockImplementation((query) => {
          if (query.where.id === 1) {
            return Promise.resolve(produtorMock);
          } else {
            return Promise.resolve(null);
          }
        });
      
        Emprestimos.create.mockResolvedValue(emprestimoCriadoMock);
      
        const emprestimo = await criarEmprestimo(
          produtorMock,
          qtd_sacas,
          valorTotal,
          data_quitacao,
          estado
        );
      
        expect(emprestimo).toEqual(emprestimoCriadoMock);
        expect(Emprestimos.create).toHaveBeenCalledWith({
          produtor_id: produtorMock.id,
          qtd_sacas,
          valor_total: valorTotal,
          data_quitacao,
          estado,
        });
      });
      
  
    test('Deve lançar um erro ao criar o empréstimo', async () => {
      const produtorMock = { id: 1 };
      const qtd_sacas = 10;
      const valorTotal = 1000.0;
      const data_quitacao = new Date();
      const estado = 'SP';
  
      Produtores.findOne.mockResolvedValue(produtorMock);
      Emprestimos.create.mockRejectedValue(new Error('Erro de banco de dados'));
  
      await expect(
        criarEmprestimo(produtorMock, qtd_sacas, valorTotal, data_quitacao, estado)
      ).rejects.toThrow('Erro ao realizar o emprestimo');     
      expect(Emprestimos.create).toHaveBeenCalledWith({
        produtor_id: produtorMock.id,
        qtd_sacas,
        valor_total: valorTotal,
        data_quitacao,
        estado,
      });
    });
  });
  
  describe('retornaUltimosEmprestimos', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('Deve retornar os últimos empréstimos ordenados por data de vencimento', async () => {
      const emprestimosMock = [
        {
          id: 1,
          Produtor: { nome: 'Rafael Cena', estado: 'SP' },
          qtd_sacas: 10,
          valor_total: 1000.0,
          data_quitacao: new Date('2023-09-29'),
        },
        // Adicione mais empréstimos mock se desejar
      ];
  
      Emprestimos.findAll.mockResolvedValue(emprestimosMock);
  
      const emprestimosOrdenados = [...emprestimosMock].sort(
        (a, b) => new Date(a.data_quitacao) - new Date(b.data_quitacao)
      );
  
      const formataRetorno = emprestimosOrdenados.map(emprestimo => {
        return {
          nomeProdutor: emprestimo.Produtor.nome,
          estado: emprestimo.Produtor.estado,
          qtdSacasCafe: emprestimo.qtd_sacas,
          valorTotalEmprestimo: emprestimo.valor_total,
          dataVencimento: emprestimo.data_quitacao,
        };
      });
  
      const emprestimosRetornados = await retornaUltimosEmprestimos();
  
      expect(emprestimosRetornados).toEqual(formataRetorno);
      expect(Emprestimos.findAll).toHaveBeenCalledWith({
        limit: 10,
        order: [['id', 'DESC']],
        include: [{ model: Produtores, as: 'Produtor' }],
      });
    });
  
    test('Deve retornar um array vazio quando não há empréstimos no banco de dados', async () => {
      Emprestimos.findAll.mockResolvedValue([]);
  
      const emprestimosRetornados = await retornaUltimosEmprestimos();
  
      expect(emprestimosRetornados).toEqual([]);
      expect(Emprestimos.findAll).toHaveBeenCalledWith({
        limit: 10,
        order: [['id', 'DESC']],
        include: [{ model: Produtores, as: 'Produtor' }],
      });
    });
  
    test('Deve lançar um erro ao buscar os empréstimos no banco de dados', async () => {
      Emprestimos.findAll.mockRejectedValue(new Error('Erro de banco de dados'));
  
      await expect(retornaUltimosEmprestimos()).rejects.toThrow('Erro ao buscar os emprestimos.');
      expect(Emprestimos.findAll).toHaveBeenCalledWith({
        limit: 10,
        order: [['id', 'DESC']],
        include: [{ model: Produtores, as: 'Produtor' }],
      });
    });
  });
  