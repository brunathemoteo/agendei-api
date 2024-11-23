import db from '../database/db.js';

async function listByUser(userId) {
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
                    WHERE a.id_user = @id
                ORDER BY a.booking_date, a.booking_hour`;

	try {
		const appointments = await db.query(sql, { id: userId });
		return appointments.recordset;
	} catch (error) {
		console.log('Erro ao obter consultas: ', error);
		throw error;
	}
}

async function listById(id_appointment) {
	const sql = `SELECT a.id_appointment, 
						a.id_service,
                        s.description AS service, 
						a.id_doctor,
                        d.name AS doctor, 
                        d.specialty, 
                        a.booking_date, 
                        a.booking_hour, 
						a.id_user,
                        u.name, 
                        ds.price
                    FROM Appointments AS a
                JOIN Services AS s ON (s.id_service = a.id_service)
                JOIN Doctors AS d ON (d.id_doctor = a.id_doctor)
                JOIN Users AS u ON (u.id_user = a.id_user)
                JOIN Doctors_Services as ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
                    WHERE a.id_appointment = @id`;

	try {
		const appointments = await db.query(sql, { id: id_appointment });
		return appointments.recordset[0];
	} catch (error) {
		console.log('Erro ao obter consultas: ', error);
		throw error;
	}
}

async function createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour) {
	try {
		const sql = `
            INSERT INTO Appointments (id_user, id_doctor, id_service, booking_date, booking_hour) VALUES (@id_user, @id_doctor, @id_service, @booking_date, @booking_hour);
        `;
		const result = await db.query(sql, { id_user, id_doctor, id_service, booking_date, booking_hour });

		if (result.rowsAffected[0] === 0) {
			return null;
		}

		return {
			success: true,
			message: 'Agendamento efetuado.',
		};
	} catch (error) {
		console.log('Erro ao executar a consulta create appointment: ', error);
		throw error;
	}
}

async function deleteAppointment(id_user, id_appointment) {
	const sql = `DELETE FROM Appointments 
                    WHERE id_appointment = @id_a and id_user = @id_u`;

	await db.query(sql, { id_a: id_appointment, id_u: id_user });
	return { id_appointment };
}

async function editAppointmentAdmin(id_appointment, userID, doctorID, serviceID, bookingDate, bookingHour) {
	try {
		if (!id_appointment) {
			throw new Error('Appointment ID must be provided');
		}

		const sql = `
			UPDATE Appointments 
			SET 
				id_user = @userID,
				id_doctor = @doctorID,
				id_service = @serviceID,
				booking_date = @bookingDate,
				booking_hour = @bookingHour
			WHERE 
				id_appointment = @id_appointment
		`;

		const result = await db.query(sql, {
			id_appointment,
			userID,
			doctorID: doctorID || null,
			serviceID: serviceID || null,
			bookingDate: bookingDate || null,
			bookingHour: bookingHour || null,
		});

		if (result.rowsAffected[0] === 0) {
		}
		return { id_appointment, message: 'Appointment updated successfully' };
	} catch (error) {
		console.error('Erro ao atualizar appointment:', error);
		throw error;
	}
}

export default { listByUser, createAppointment, deleteAppointment, listById, editAppointmentAdmin };
