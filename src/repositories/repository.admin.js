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

async function createAdmin(name, email, password) {
	try {
		const emailExists = await checkEmailExists(email);
		if (emailExists) {
			return { error: 'O e-mail já está cadastrado.' };
		}

		const sql = `INSERT INTO Admins (name, email, password) 
                     VALUES (@name, @email, @password);
                     SELECT SCOPE_IDENTITY() AS id_admin;`;

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

async function findUserByEmailAdmin(email) {
	const sql = 'SELECT * FROM Admins WHERE email = @Email';
	const result = await db.query(sql, { Email: email });
	return result.recordset.length > 0 ? result.recordset[0] : null;
}

async function listAllAppointments() {
	const sql = `SELECT a.id_appointment, 
                        s.description AS service, 
                        d.name AS doctor, 
                        d.specialty, 
                        a.booking_date, 
                        a.booking_hour, 
                        u.name, 
                        ds.price
                    FROM Appointments AS a
                JOIN Services AS s ON (s.id_service = a.id_service)
                JOIN Doctors AS d ON (d.id_doctor = a.id_doctor)
                JOIN Users AS u ON (u.id_user = a.id_user)
                JOIN Doctors_Services as ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
				WHERE a.booking_date >= GETDATE()
                ORDER BY a.booking_date, a.booking_hour`;

	try {
		const appointments = await db.query(sql);
		return appointments.recordset;
	} catch (error) {
		console.log('Erro ao obter consultas: ', error);
		throw error;
	}
}

async function listAllUsers() {
	try {
		const sql = 'SELECT id_user, name, email from Users';

		const users = await db.query(sql);
		return users.recordset;
	} catch (error) {
		console.log('Erro ao obter consulta de usuários: ', error);
		throw error;
	}
}

export default { createAdmin, findUserByEmailAdmin, listAllAppointments, listAllUsers };
