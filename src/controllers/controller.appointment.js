import serviceAppointment from "../services/service.appointment.js"

async function listByUser(req, res){

    try {
        const userId = req.id_user;
        const appointments = await serviceAppointment.listByUser(userId)
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Erro ao listar agendamentos:", error);
        res.status(500).json({ message: "An error occurred"}) 
    }

}

async function createAppointment(req, res) {

    const id_user = req.id_user;
    const { id_doctor, id_service, booking_date, booking_hour} = req.body;

    const appointment = await serviceAppointment.createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour);
    res.status(201).json(appointment);
    
}

async function deleteAppointment(req, res) {
    try {
        const id_user = req.id_user;
        const id_appointment = req.params.id_appointment;
    
        const appointment = await serviceAppointment.deleteAppointment(id_user, id_appointment);

        if (appointment) {
           return res.status(200).json({ message: "Agendamento deletado com sucesso" });
        } 
        return res.status(404).json({ message: "Agendamento não encontrado"});
    }
    catch (error) {
        console.log("Erro ao deletar agendamento: ",error)
        return res.status(500).json({ message: "Erro ao deletar agendamento" });
    }
}

export default {listByUser, createAppointment, deleteAppointment};