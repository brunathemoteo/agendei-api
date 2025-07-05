import serviceAdmin from '../services/service.admin.js';

async function createAdmin(req, res) {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'All fields are required.' });
	}

	try {
		const user = await serviceAdmin.createAdmin(name, email, password);
		if (!user) {
			return res.status(400).json({ message: 'User could not be created.' });
		}
		res.status(201).json(user);
	} catch (error) {
		console.log('Erro ao criar usuario: ', error);
		return res.status(500).json({ message: 'An error occurred while creating the user.' });
	}
}

async function loginAdmin(req, res) {
	const { email, password } = req.body;

	const user = await serviceAdmin.loginAdmin(email, password);

	if (!user || user.error) {
		return res.status(401).json({ error: user ? user.error : 'Email ou senha inválidos.' });
	}

	return res.status(200).json(user);
}

async function listAllAppointments(req, res) {
	try {
		const { page, limit, startDate, endDate, doctorId } = req.query;

		const filters = {
			page: Number(page) || 1,
			limit: Number(limit) || 10,
			startDate: startDate || null,
			endDate: endDate || null,
			doctorId: doctorId ? Number(doctorId) : null,
		};

		const result = await serviceAdmin.listAllAppointments(filters);
		return res.status(200).json(result);
	} catch (error) {
		console.error('Erro ao listar agendamentos:', error);
		return res.status(500).json({ error: 'Erro ao listar agendamentos' });
	}
}

async function listAllUsers(req, res) {
	const users = await serviceAdmin.listAllUsers();

	res.status(200).json(users);
}

export default { createAdmin, loginAdmin, listAllAppointments, listAllUsers };
