import { createUser } from '../src/repositories/repository.user.js';
import db from '../src/database/db.js'; // Mock do banco de dados

// Mockar o módulo de banco de dados
jest.mock('../src/database/db.js');

describe('repositoryUser - createUser', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa mocks entre os testes
  });

  test('Deve criar um usuário com sucesso e retornar o ID', async () => {
    // Mock da resposta do banco de dados simulando o retorno esperado
    const mockResult = {
      rowsAffected: [1],
      recordset: [{ id_user: 123 }]
    };

    db.query.mockResolvedValue(mockResult);

    const user = await createUser('John Doe', 'john@example.com', 'password123');

    // Verifica se a query foi chamada corretamente
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO Users'),
      { name: 'John Doe', email: 'john@example.com', password: 'password123' }
    );

    // Verifica se o resultado retornou o ID correto
    expect(user).toEqual({ id: 123 });
  });

  test('Deve retornar null se nenhuma linha for afetada (usuário não criado)', async () => {
    const mockResult = {
      rowsAffected: [0],
      recordset: []
    };

    db.query.mockResolvedValue(mockResult);

    const user = await createUser('John Doe', 'john@example.com', 'password123');

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(user).toBeNull();
  });

  test('Deve lançar um erro ao falhar na criação de um usuário', async () => {
    // Simulando um erro no banco de dados
    const mockError = new Error('Database error');
    db.query.mockRejectedValue(mockError);

    await expect(createUser('John Doe', 'john@example.com', 'password123')).rejects.toThrow('Database error');

    expect(db.query).toHaveBeenCalledTimes(1);
  });
});
