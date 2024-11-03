import repositoryAppointment from "../repositories/repository.appointment.js";

async function listByUser(userId) {
    try {
        const result = await repositoryAppointment.listByUser(userId);
        return result;
    } catch (error) {
        console.error("Erro ao listar agendamentos no serviço:", error);
        throw error; // Relança o erro para ser tratado pelo controlador
    }
}

async function createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour) {

    const appointment = await repositoryAppointment.createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour);
    return appointment;
    
}

async function deleteAppointment(id_user, id_appointment) {

    const appointment = await repositoryAppointment.deleteAppointment(id_user, id_appointment)
    return appointment;

}
 
export default {listByUser, createAppointment, deleteAppointment };
