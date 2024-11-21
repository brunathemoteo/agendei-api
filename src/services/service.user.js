import bcrypt from 'bcrypt';
import repositoryUser from '../repositories/repository.user.js';
import jwt from '../token.js';

async function createUser(name, email, password) {
	const hashPassword = await bcrypt.hash(password, 10);
	const user = await repositoryUser.createUser(name, email, hashPassword);

	user.token = jwt.createToken(user.id_user);

	return user;
}

async function loginUser(email, password) {
	try {
		const user = await repositoryUser.findUserByEmail(email);

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

async function profile(id_user) {
	const user = await repositoryUser.profile(id_user);
	return user;
}

export default { createUser, loginUser, profile };
