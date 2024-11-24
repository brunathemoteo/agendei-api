import repositoryAppointment from '../repositories/repository.appointment.js';

async function listAppointmentsByUser(userId) {
	try {
		return await repositoryAppointment.listAppointmentsByUser(userId);
	} catch (error) {
		console.error('Erro no serviço de agendamentos:', error);
		throw new Error('Erro ao processar a listagem de agendamentos.');
	}
}

async function getAppointmentDetails(idAppointment) {
	try {
		return await repositoryAppointment.getAppointmentDetails(idAppointment);
	} catch (error) {
		console.error(error);
		throw new Error('Erro ao processar agendamento.');
	}
}

async function createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour) {
	const appointment = await repositoryAppointment.createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour);
	return appointment;
}

async function editAppointmentAdmin(idAppointment, userID, doctorID, serviceID, bookingDate, bookingHour) {
	return await repositoryAppointment.editAppointmentAdmin(idAppointment, userID, doctorID, serviceID, bookingDate, bookingHour);
}

async function cancelAppointment(id_user, idAppointment) {
	const appointment = await repositoryAppointment.cancelAppointment(id_user, idAppointment);
	return appointment;
}

export default { listAppointmentsByUser, createAppointment, cancelAppointment, getAppointmentDetails, editAppointmentAdmin };
