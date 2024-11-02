import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import jwt from "./token.js"

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

// Appointments
router.get("/appointments", jwt.validateToken, controllerAppointment.listAppointments)


export default router;
