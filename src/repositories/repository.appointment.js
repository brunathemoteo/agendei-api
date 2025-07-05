import db from '../database/db.js';

async function listAppointmentsByUser(userId) {
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
                    WHERE CAST(a.booking_date AS DATETIME) + CAST(a.booking_hour AS DATETIME) >= GETDATE()
                ORDER BY a.booking_date, a.booking_hour`;

	try {
		const appointments = await db.query(sql, { id: userId });
		return appointments.recordset;
	} catch (error) {
		console.log('Erro ao obter consultas: ', error);
		throw error;
	}
}

async function getAppointmentDetails(idAppointment) {
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
		const appointments = await db.query(sql, { id: idAppointment });
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

async function cancelAppointment(id_user, idAppointment) {
	const sql = `DELETE FROM Appointments 
                    WHERE id_appointment = @idAppointment and id_user = @id_u`;

	try {
		await db.query(sql, { idAppointment, id_u: id_user });
		return { idAppointment };
	} catch (error) {
		console.error('Erro ao cancelar a consulta:', error);
		throw new Error('Falha ao cancelar a consulta.');
	}
}

async function editAppointmentAdmin(idAppointment, userID, doctorID, serviceID, bookingDate, bookingHour) {
	try {
		if (!idAppointment) {
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
				id_appointment = @idAppointment
		`;

		const result = await db.query(sql, {
			idAppointment,
			userID,
			doctorID: doctorID || null,
			serviceID: serviceID || null,
			bookingDate: bookingDate || null,
			bookingHour: bookingHour || null,
		});

		if (result.rowsAffected[0] === 0) {
		}
		return { idAppointment, message: 'Appointment updated successfully' };
	} catch (error) {
		console.error('Erro ao atualizar appointment:', error);
		throw error;
	}
}

export default { listAppointmentsByUser, createAppointment, cancelAppointment, getAppointmentDetails, editAppointmentAdmin };
