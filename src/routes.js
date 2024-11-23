import { Router } from 'express';
import controllerAdmin from './controllers/controller.admin.js';
import controllerAppointment from './controllers/controller.appointment.js';
import controllerDoctor from './controllers/controller.doctor.js';
import controllerUser from './controllers/controller.user.js';
import jwt from './token.js';

const router = Router();

// Doctors
router.get('/doctors', jwt.validateToken, controllerDoctor.listDoctors);
router.post('/doctors', jwt.validateToken, controllerDoctor.createDoctor);
router.put('/doctors/:id_doctor', jwt.validateToken, controllerDoctor.updateDoctor);
router.delete('/doctors/:id_doctor', jwt.validateToken, controllerDoctor.deleteDoctor);
router.get('/doctors/:id_doctor/services', jwt.validateToken, controllerDoctor.listDoctorsServices);

// Users
router.post('/user/register', controllerUser.createUser);
router.post('/users/login', controllerUser.loginUser);
router.get('/user/profile', jwt.validateToken, controllerUser.profile);

// Appointments
router.get('/appointments', jwt.validateToken, controllerAppointment.listByUser);
router.post('/appointments', jwt.validateToken, controllerAppointment.createAppointment);
router.delete('/appointments/:id_appointment', jwt.validateToken, controllerAppointment.deleteAppointment);

// Admins
router.post('/admin/register', controllerAdmin.createUserAdmin);
router.post('/admin/login', controllerAdmin.loginAdmin);
router.get('/admin/appointments', jwt.validateToken, controllerAdmin.listAppointments);
router.get('/admin/users', jwt.validateToken, controllerAdmin.listUsers);
router.get('/admin/appointments/:id_appointment', jwt.validateToken, controllerAppointment.listById);
router.post('/admin/appointments', jwt.validateToken, controllerAppointment.createAppointmentAdmin);
router.put('/admin/appointments/:id_appointment', jwt.validateToken, controllerAppointment.editAppointmentAdmin);

export default router;
