import repositoryDoctor from '../repositories/repository.doctor.js';

async function listDoctors(name) {
	const doctors = await repositoryDoctor.getDoctors(name);
	return doctors;
}

async function createDoctor(name, specialty, icon) {
	const doctor = await repositoryDoctor.createDoctor(name, specialty, icon);
	return doctor;
}

async function deleteDoctor(idDoctor) {
	const result = await repositoryDoctor.deleteDoctor(idDoctor);

	if (!result) {
		throw new Error(`Doctor with ID ${idDoctor} not found`);
	}

	return { message: `Doctor with ID ${idDoctor} was successfully deleted` };
}

async function updateDoctor(idDoctor, name, specialty, icon) {
	const result = await repositoryDoctor.updateDoctor(idDoctor, name, specialty, icon);
	return result;
}

async function getDoctorServices(idDoctor) {
	const services = await repositoryDoctor.getDoctorServices(idDoctor);
	return services;
}

export default { listDoctors, createDoctor, deleteDoctor, updateDoctor, getDoctorServices };
