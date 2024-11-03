import db from "../database/db.js";

async function listByUser(userId){
    let sql = `SELECT a.id_appointment, s.description AS service, d.name AS doctor, d.specialty, a.booking_date, a.booking_hour, u.name, ds.price
                FROM Appointments AS a
                JOIN Services AS s ON (s.id_service = a.id_service)
                JOIN Doctors AS d ON (d.id_doctor = a.id_doctor)
                JOIN Users AS u ON (u.id_user = a.id_user)
                JOIN Doctors_Services as ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
                WHERE a.id_user = @id
                ORDER BY a.booking_date, a.booking_hour`

    try {
        const appointments = await db.query(sql, {id: userId});
        return appointments.recordset;
    } catch (error) {
        console.log("Erro ao obter consultas: ", error);
        throw error;
    }
}

async function createAppointment(id_user, id_doctor, id_service, booking_date, booking_hour) {
    try {
        const sql = `
            INSERT INTO Appointments (id_user, id_doctor, id_service, booking_date, booking_hour) VALUES (@id_user, @id_doctor, @id_service, @booking_date, @booking_hour);
        `;
        const result = await db.query(sql, { id_user, id_doctor, id_service, booking_date, booking_hour });

        if (result.rowsAffected[0] === 0) {
            return null; 
        }

        return result[0];
    } catch (error) {
        console.log("Erro ao executar a consulta create appointment: ", error);
        throw error;
    }
}

async function deleteAppointment(id_user, id_appointment) {
    const sql = `DELETE FROM Appointments 
                WHERE id_appointment = @id_a and id_user = @id_u
                `

    await db.query(sql, { id_a: id_appointment, id_u: id_user } )
    return {id_appointment};
}

export default {listByUser, createAppointment, deleteAppointment};