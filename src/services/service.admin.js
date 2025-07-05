import bcrypt from 'bcrypt';
import repositoryAdmin from '../repositories/repository.admin.js';
import jwt from '../token.js';

async function createAdmin(name, email, password) {
	const hashPassword = await bcrypt.hash(password, 10);
	const user = await repositoryAdmin.createAdmin(name, email, hashPassword);

	user.token = jwt.createToken(user.id_user);

	return user;
}

async function loginAdmin(email, password) {
	try {
		const user = await repositoryAdmin.findUserByEmailAdmin(email);

		if (!user) {
			return { error: 'Usuário não encontrado.' };
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return { error: 'Senha incorreta.' };
		}

		user.token = jwt.createToken(user.id_user);

		const { password: _, ...userWithoutPassword } = user;
		return userWithoutPassword;
	} catch (error) {
		console.log('Erro ao executar a query de login: ', error);
		throw error;
	}
}

async function listAllAppointments(page, limit) {
	try {
		return await repositoryAdmin.listAllAppointments(page, limit);
	} catch (error) {
		console.error('Erro no serviço de agendamentos:', error);
		throw new Error('Erro ao processar a listagem de agendamentos.');
	}
}

async function listAllUsers() {
	try {
		return await repositoryAdmin.listAllUsers();
	} catch (error) {
		console.error('Erro:', error);
		throw new Error('Erro ao processar a listagem de usuários.');
	}
}

export default { createAdmin, loginAdmin, listAllAppointments, listAllUsers };
