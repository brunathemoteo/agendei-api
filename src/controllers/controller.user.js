import serviceAppointment from '../services/service.appointment.js';
import serviceUser from '../services/service.user.js';

async function createUser(req, res) {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'All fields are required.' });
	}

	try {
		const user = await serviceUser.createUser(name, email, password);
		if (!user) {
			return res.status(400).json({ message: 'User could not be created.' });
		}
		res.status(201).json(user);
	} catch (error) {
		console.log('Erro ao criar usuario: ', error);
		return res.status(500).json({ message: 'An error occurred while creating the user.' });
	}
}

async function loginUser(req, res) {
	const { email, password } = req.body;

	const user = await serviceUser.loginUser(email, password);

	if (!user || user.error) {
		return res.status(401).json({ error: user ? user.error : 'Email ou senha inválidos.' });
	}

	return res.status(200).json(user);
}

async function profile(req, res) {
	const id_user = req.id_user;
	const user = await serviceUser.profile(id_user);

	res.status(200).json(user);
}

export default { createUser, loginUser, profile };
