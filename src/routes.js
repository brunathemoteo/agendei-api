import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import controllerAppointment from "./controllers/controller.appointment.js";
import jwt from "./token.js";

const router = Router();

// Doctors
router.get("/doctors", jwt.validateToken, controllerDoctor.listDoctors);
router.post("/doctors", jwt.validateToken, controllerDoctor.createDoctor);
router.put("/doctors/:id_doctor", jwt.validateToken, controllerDoctor.updateDoctor);
router.delete("/doctors/:id_doctor", jwt.validateToken, controllerDoctor.deleteDoctor);
router.get("/doctors/:id_doctor/services", jwt.validateToken, controllerDoctor.listDoctorsServices);

// Users
router.post("/user/register", controllerUser.createUser);
router.post("/users/login", controllerUser.loginUser);
router.get("/user/profile", jwt.validateToken, controllerUser.profile);

// Appointments
router.get("/appointments", jwt.validateToken, controllerAppointment.listByUser);
router.post("/appointments", jwt.validateToken, controllerAppointment.createAppointment);
router.delete("/appointments/:id_appointment", jwt.validateToken, controllerAppointment.deleteAppointment);


export default router;
