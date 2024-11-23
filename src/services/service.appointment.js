import repositoryAppointment from '../repositories/repository.appointment.js';

async function listByUser(userId) {
	try {
		return await repositoryAppointment.listByUser(userId);
	} catch (error) {
		console.error('Erro no serviço de agendamentos:', error);
		throw new Error('Erro ao processar a listagem de agendamentos.');
	}
}

async function listById(id_appointment) {
	try {
		return await repositoryAppointment.listById(id_appointment);
	} catch (error) {
		console.error(error);
		throw new Error('Erro ao processar agendamento.');
	}
}

async function createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour) {
	const appointment = await repositoryAppointment.createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour);
	return appointment;
}

async function editAppointmentAdmin(id_appointment, userID, doctorID, serviceID, bookingDate, bookingHour) {
	return await repositoryAppointment.editAppointmentAdmin(id_appointment, userID, doctorID, serviceID, bookingDate, bookingHour);
}

async function deleteAppointment(id_user, id_appointment) {
	const appointment = await repositoryAppointment.deleteAppointment(id_user, id_appointment);
	return appointment;
}

export default { listByUser, createAppointment, deleteAppointment, listById, editAppointmentAdmin };
