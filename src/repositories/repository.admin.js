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

async function listAllAppointments({ page = 1, limit = 10, startDate, endDate, doctorId }) {
	const offset = (page - 1) * limit;
	const start = startDate || '1900-01-01';
	const end = endDate ? `${endDate} 23:59:59` : '9999-12-31 23:59:59';

	const queryData = `
	SELECT a.id_appointment, s.description AS service, d.name AS doctor, d.specialty,
		   a.booking_date, a.booking_hour, u.name, ds.price
	FROM Appointments AS a
	JOIN Services AS s ON s.id_service = a.id_service
	JOIN Doctors AS d ON d.id_doctor = a.id_doctor
	JOIN Users AS u ON u.id_user = a.id_user
	JOIN Doctors_Services AS ds ON ds.id_doctor = a.id_doctor AND ds.id_service = a.id_service
	WHERE DATEADD(SECOND, DATEDIFF(SECOND, 0, a.booking_hour), CAST(a.booking_date AS DATETIME))
		BETWEEN @start AND @end
	  AND (@doctorId IS NULL OR d.id_doctor = @doctorId)
	ORDER BY DATEADD(SECOND, DATEDIFF(SECOND, 0, a.booking_hour), CAST(a.booking_date AS DATETIME))
	OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
`;

	const queryTotal = `
	SELECT COUNT(*) AS total
	FROM Appointments AS a
	JOIN Services AS s ON s.id_service = a.id_service
	JOIN Doctors AS d ON d.id_doctor = a.id_doctor
	JOIN Users AS u ON u.id_user = a.id_user
	JOIN Doctors_Services AS ds ON ds.id_doctor = a.id_doctor AND ds.id_service = a.id_service
	WHERE DATEADD(SECOND, DATEDIFF(SECOND, 0, a.booking_hour), CAST(a.booking_date AS DATETIME))
		BETWEEN @start AND @end
	  AND (@doctorId IS NULL OR d.id_doctor = @doctorId);
`;

	const params = {
		start,
		end,
		doctorId: doctorId || null,
		offset,
		limit,
	};

	try {
		const [appointments, totalResult] = await Promise.all([db.query(queryData, params), db.query(queryTotal, params)]);

		const total = totalResult.recordset[0].total;

		return {
			data: appointments.recordset,
			total,
			page,
			limit,
		};
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
