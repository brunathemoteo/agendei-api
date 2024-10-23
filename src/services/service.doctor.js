import repositoryDoctor from "../repositories/repository.doctor.js";

async function listDoctors(name) {
	const doctors = await repositoryDoctor.getDoctors(name);
	return doctors;
}

async function createDoctor(name, specialty, icon) {
	const doctor = await repositoryDoctor.createDoctor(name, specialty, icon);
	return doctor;
}

async function deleteDoctor(doctorID) {
	const result = await repositoryDoctor.deleteDoctor(doctorID);

	if (!result) {
        throw new Error(`Doctor with ID ${doctorID} not found`);
    }
	
    return { message: `Doctor with ID ${doctorID} was successfully deleted` };
}

async function updateDoctor(doctorID, name, specialty, icon){
	const result = await repositoryDoctor.updateDoctor(doctorID, name, specialty, icon);
	return result;
}

export default { listDoctors, createDoctor, deleteDoctor, updateDoctor };
