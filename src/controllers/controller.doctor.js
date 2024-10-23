import serviceDoctor from "../services/service.doctor.js";

async function listDoctors(req, res) {

	const name = req.query.name;
    const doctors = await serviceDoctor.listDoctors(name);
	res.status(200).json(doctors);
}
async function createDoctor(req, res) {
    const { name, specialty, icon } = req.body;

    if (!name || !specialty || !icon) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const doctor = await serviceDoctor.createDoctor(name, specialty, icon);
        if (!doctor) {
            return res.status(400).json({ message: "Doctor could not be created." });
        }
        res.status(201).json(doctor);
    } catch (error) {
        console.error("Erro ao criar médico:", error);
        res.status(500).json({ message: "An error occurred while creating the doctor." });
    }
}

async function deleteDoctor(req, res) {
    try {
        const doctorID = req.params.id_doctor;

        if (!doctorID) {
            return res.status(400).json({ message: "Doctor ID is required" });
        }

        const result = await serviceDoctor.deleteDoctor(doctorID);

        if (!result) {
            return res.status(404).json({ message: `Doctor with ID ${doctorID} not found` });
        }
        return res.status(200).json({ message: `Doctor with ID ${doctorID} was successfully deleted` });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return res.status(500).json({ message: "An error occurred while deleting the doctor", error: error.message });
    }
}

async function updateDoctor(req, res) {
    const { name, specialty, icon } = req.body;
    const doctorID = req.params.id_doctor;

    if (!doctorID) {
        return res.status(400).json({ message: "Doctor ID is required." });
    }

    if (!name || !specialty || !icon) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const updatedDoctor = await serviceDoctor.updateDoctor(doctorID, name, specialty, icon);
        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found." });
        }
        res.status(200).json(updatedDoctor);
    } catch (error) {
        console.error("Erro ao atualizar médico:", error);
        res.status(500).json({ message: "An error occurred while updating the doctor." });
    }
}

export default { listDoctors, createDoctor, deleteDoctor, updateDoctor };
