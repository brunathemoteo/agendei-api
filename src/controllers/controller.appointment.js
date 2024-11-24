import serviceAppointment from '../services/service.appointment.js';

async function listAppointmentsByUser(req, res) {
	try {
		const userId = req.id_user;
		const appointments = await serviceAppointment.listAppointmentsByUser(userId);
		res.status(200).json(appointments);
	} catch (error) {
		console.error('Erro ao listar agendamentos:', error);
		res.status(500).json({ message: 'An error occurred' });
	}
}

async function getAppointmentDetails(req, res) {
	try {
		const idAppointment = req.params.idAppointment;
		const appointments = await serviceAppointment.getAppointmentDetails(idAppointment);
		res.status(200).json(appointments);
	} catch (error) {
		console.error('Erro ao listar agendamento:', error);
		res.status(500).json({ message: 'Error no servidor' });
	}
}

async function createAppointment(req, res) {
	const id_user = req.id_user;
	const { id_doctor, id_service, booking_date, booking_hour } = req.body;

	const appointment = await serviceAppointment.createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour);
	res.status(201).json(appointment);
}

async function createAppointmentAdmin(req, res) {
	const { id_user, id_doctor, id_service, booking_date, booking_hour } = req.body;

	const appointment = await serviceAppointment.createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour);
	res.status(201).json(appointment);
}

async function editAppointmentAdmin(req, res) {
	const { id_user, id_doctor, id_service, booking_date, booking_hour } = req.body;
	const idAppointment = req.params.idAppointment;

	if (!idAppointment) {
		return res.status(400).json({ message: 'Appointment ID is required.' });
	}
	try {
		const updateAppointment = await serviceAppointment.editAppointmentAdmin(idAppointment, id_user, id_doctor, id_service, booking_date, booking_hour);
		if (!updateAppointment) {
			return res.status(404).json({ message: 'Appointment not found.' });
		}
		res.status(200).json(updateAppointment);
	} catch (error) {
		console.error('Erro ao atualizar agendamento:', error);
		res.status(500).json({ error: 'Não foi possível editar o agendamento.' });
	}
}

async function cancelAppointment(req, res) {
	try {
		const id_user = req.id_user;
		const idAppointment = req.params.idAppointment;

		if (!id_user || !idAppointment) {
			return res.status(400).json({ message: 'Dados incompletos' });
		}

		const appointment = await serviceAppointment.cancelAppointment(id_user, idAppointment);

		if (appointment) {
			return res.status(200).json({
				message: `Agendamento deletado com sucesso. Id appointment: ${idAppointment}`,
			});
		}
		return res.status(404).json({ message: 'Agendamento não encontrado' });
	} catch (error) {
		console.log('Erro ao deletar agendamento: ', error);
		return res.status(500).json({ message: 'Erro ao deletar agendamento' });
	}
}

export default { listAppointmentsByUser, createAppointment, cancelAppointment, getAppointmentDetails, editAppointmentAdmin, createAppointmentAdmin };
