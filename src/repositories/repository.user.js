import db from '../database/db.js';

async function checkEmailExists(email) {
	try {
		const sql = 'SELECT COUNT(*) AS Count FROM Users WHERE email = @Email';
		const result = await db.query(sql, { Email: email });
		return result.recordset[0]?.Count > 0;
	} catch (error) {
		console.error('Erro ao verificar e-mail:', error);
		throw error;
	}
}

async function createUser(name, email, password) {
	try {
		const emailExists = await checkEmailExists(email);
		if (emailExists) {
			return { error: 'O e-mail já está cadastrado.' };
		}

		const sql = `INSERT INTO Users (name, email, password) 
                     VALUES (@name, @email, @password);
                     SELECT SCOPE_IDENTITY() AS id_user;`;

		const user = await db.query(sql, { name, email, password });

		if (user.rowsAffected[0] === 0) {
			return null;
		}

		return { id: user.recordset[0]?.id_user };
	} catch (error) {
		console.log('Erro ao executar a query create user: ', error);
		throw error;
	}
}

async function findUserByEmail(email) {
	const sql = 'SELECT * FROM Users WHERE email = @Email';
	const result = await db.query(sql, { Email: email });
	return result.recordset.length > 0 ? result.recordset[0] : null;
}

async function profile(id_user) {
	const sql = 'SELECT id_user, name, email FROM Users WHERE id_user = @id';

	const userProfile = await db.query(sql, { id: id_user });
	return userProfile.recordset[0];
}

export default { createUser, findUserByEmail, profile };
