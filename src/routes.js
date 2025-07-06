import { Router } from 'express';
import controllerAdmin from './controllers/controller.admin.js';
import controllerAppointment from './controllers/controller.appointment.js';
import controllerDoctor from './controllers/controller.doctor.js';
import controllerUser from './controllers/controller.user.js';
import jwt from './token.js';

const router = Router();

// Doctors
router.get('/doctors', controllerDoctor.listDoctors);
router.post('/doctors', jwt.validateToken, controllerDoctor.createDoctor);
router.put('/doctors/:idDoctor', jwt.validateToken, controllerDoctor.updateDoctor);
router.delete('/doctors/:idDoctor', jwt.validateToken, controllerDoctor.deleteDoctor);
router.get('/doctors/:idDoctor/services', jwt.validateToken, controllerDoctor.getDoctorServices);

// Users
router.post('/user/register', controllerUser.createUser);
router.post('/users/login', controllerUser.loginUser);
router.get('/users/me', jwt.validateToken, controllerUser.profile);

// Appointments
router.get('/appointments', jwt.validateToken, controllerAppointment.listAppointmentsByUser);
router.post('/appointments', jwt.validateToken, controllerAppointment.createAppointment);
router.delete('/appointments/:idAppointment/cancel', jwt.validateToken, controllerAppointment.cancelAppointment);

// Admins
router.post('/admin/register', controllerAdmin.createAdmin);
router.post('/admin/login', controllerAdmin.loginAdmin);
router.get('/admin/appointments', jwt.validateToken, controllerAdmin.listAllAppointments);
router.get('/admin/users', jwt.validateToken, controllerAdmin.listAllUsers);
router.get('/admin/appointments/:idAppointment', jwt.validateToken, controllerAppointment.getAppointmentDetails);
router.post('/admin/appointments', jwt.validateToken, controllerAppointment.createAppointmentAdmin);
router.put('/admin/appointments/:idAppointment', jwt.validateToken, controllerAppointment.editAppointmentAdmin);

export default router;
