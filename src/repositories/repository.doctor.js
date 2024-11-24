import db from '../database/db.js';

async function getDoctors(name) {
	let sql = 'SELECT * FROM doctors ';

	if (name) {
		sql += 'WHERE name LIKE @name ';
	}

	sql += 'ORDER BY name';

	try {
		const doctors = await db.query(sql, { name: `%${name}%` });
		return doctors.recordset;
	} catch (error) {
		console.log('Erro ao obter médicos: ', error);
		throw error;
	}
}

async function deleteDoctor(idDoctor) {
	try {
		if (!idDoctor) {
			throw new Error('Doctor ID must be provided');
		}

		const sql = 'DELETE FROM Doctors WHERE id_doctor = @id';
		const result = await db.query(sql, { id: idDoctor });

		if (result.rowsAffected[0] === 0) {
			return null;
		}

		return { idDoctor };
	} catch (error) {
		console.log('Erro ao executar a consulta delete doctor: ', error);
		throw error;
	}
}

async function createDoctor(name, specialty, icon) {
	try {
		const sql = `
            INSERT INTO Doctors (name, specialty, icon) VALUES (@name, @specialty, @icon);
            SELECT SCOPE_IDENTITY() AS id_doctor;
        `;
		const result = await db.query(sql, { name, specialty, icon });

		if (result.rowsAffected[0] === 0) {
			return null;
		}

		return { id: result.recordset[0]?.id_doctor };
	} catch (error) {
		console.log('Erro ao executar a consulta create doctor: ', error);
		throw error;
	}
}

async function updateDoctor(idDoctor, name, specialty, icon) {
	try {
		if (!idDoctor) {
			throw new Error('Doctor ID must be provided');
		}

		const sql = `
            UPDATE Doctors 
            SET name = @name, specialty = @specialty, icon = @icon 
            WHERE id_doctor = @id
        `;
		const result = await db.query(sql, {
			id: idDoctor,
			name: name || '',
			specialty: specialty || '',
			icon: icon || '',
		});

		if (result.rowsAffected[0] === 0) {
			return null;
		}

		return { idDoctor, message: 'Doctor updated successfully' };
	} catch (error) {
		console.log('Erro ao executar a consulta update doctor: ', error);
		throw error;
	}
}

async function getDoctorServices(idDoctor) {
	const sql = `SELECT d.id_service, s.description, d.price
                FROM Doctors_Services as d
                JOIN Services AS s ON d.id_service = s.id_service
                WHERE d.id_doctor = @id
                ORDER BY s.description`;

	try {
		const services = await db.query(sql, { id: idDoctor });
		return services.recordset;
	} catch (error) {
		console.log('Erro ao obter serviços: ', error);
		throw error;
	}
}

export default { getDoctors, createDoctor, deleteDoctor, updateDoctor, getDoctorServices };
