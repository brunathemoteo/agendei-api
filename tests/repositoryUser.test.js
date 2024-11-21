import db from '../src/database/db.js';
import userService from './userService';

// Mock do banco de dados
jest.mock('../database/db.js');

describe('userService', () => {
	afterEach(() => {
		jest.clearAllMocks(); // Limpa os mocks após cada teste
	});

	describe('checkEmailExists', () => {
		it('deve retornar true se o e-mail existir no banco', async () => {
			db.query.mockResolvedValue({ recordset: [{ Count: 1 }] });

			const result = await userService.checkEmailExists('teste@teste.com');
			expect(result).toBe(true);
			expect(db.query).toHaveBeenCalledWith('SELECT COUNT(*) AS Count FROM Users WHERE email = @Email', { Email: 'teste@teste.com' });
		});

		it('deve retornar false se o e-mail não existir no banco', async () => {
			db.query.mockResolvedValue({ recordset: [{ Count: 0 }] });

			const result = await userService.checkEmailExists('teste@teste.com');
			expect(result).toBe(false);
		});
	});

	describe('createUser', () => {
		it('deve retornar um erro se o e-mail já estiver cadastrado', async () => {
			jest.spyOn(userService, 'checkEmailExists').mockResolvedValue(true);

			const result = await userService.createUser('Teste', 'teste@teste.com', 'senha123');
			expect(result).toEqual({ error: 'O e-mail já está cadastrado.' });
		});

		it('deve criar um usuário e retornar o id se o e-mail não estiver cadastrado', async () => {
			jest.spyOn(userService, 'checkEmailExists').mockResolvedValue(false);
			db.query.mockResolvedValue({
				rowsAffected: [1],
				recordset: [{ id_user: 1 }],
			});

			const result = await userService.createUser('Teste', 'teste@teste.com', 'senha123');
			expect(result).toEqual({ id: 1 });
		});

		it('deve retornar null se o INSERT não afetar nenhuma linha', async () => {
			jest.spyOn(userService, 'checkEmailExists').mockResolvedValue(false);
			db.query.mockResolvedValue({ rowsAffected: [0] });

			const result = await userService.createUser('Teste', 'teste@teste.com', 'senha123');
			expect(result).toBeNull();
		});
	});

	describe('findUserByEmail', () => {
		it('deve retornar o usuário se encontrado pelo e-mail', async () => {
			const mockUser = { id_user: 1, name: 'Teste', email: 'teste@teste.com' };
			db.query.mockResolvedValue({ recordset: [mockUser] });

			const result = await userService.findUserByEmail('teste@teste.com');
			expect(result).toEqual(mockUser);
			expect(db.query).toHaveBeenCalledWith('SELECT * FROM Users WHERE email = @Email', { Email: 'teste@teste.com' });
		});

		it('deve retornar null se o usuário não for encontrado pelo e-mail', async () => {
			db.query.mockResolvedValue({ recordset: [] });

			const result = await userService.findUserByEmail('teste@teste.com');
			expect(result).toBeNull();
		});
	});

	describe('profile', () => {
		it('deve retornar o perfil do usuário se encontrado pelo id', async () => {
			const mockProfile = { id_user: 1, name: 'Teste', email: 'teste@teste.com' };
			db.query.mockResolvedValue({ recordset: [mockProfile] });

			const result = await userService.profile(1);
			expect(result).toEqual(mockProfile);
			expect(db.query).toHaveBeenCalledWith('SELECT id_user, name, email FROM Users WHERE id_user = @id', { id: 1 });
		});

		it('deve retornar undefined se o id não corresponder a nenhum usuário', async () => {
			db.query.mockResolvedValue({ recordset: [] });

			const result = await userService.profile(1);
			expect(result).toBeUndefined();
		});
	});
});
