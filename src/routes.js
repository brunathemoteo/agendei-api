import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";

const router = Router();

router.get("/doctors", controllerDoctor.listDoctors);
router.post("/doctors", controllerDoctor.createDoctor);
router.put("/doctors/:id_doctor", controllerDoctor.updateDoctor);
router.delete("/doctors/:id_doctor", controllerDoctor.deleteDoctor);

router.post("/user/register", controllerUser.createUser);
router.post("/users/login", controllerUser.loginUser);

export default router;
