import repositoryDoctor from "../repositories/repository.doctor.js";

async function listDoctorsService() {
	const doctors = await repositoryDoctor.getDoctors();
	return doctors;
}

export default { listDoctorsService };
