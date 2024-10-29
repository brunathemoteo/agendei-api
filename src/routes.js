import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import jwt from "./token.js"

const router = Router();

router.get("/doctors", jwt.validateToken, controllerDoctor.listDoctors);
router.post("/doctors", jwt.validateToken, controllerDoctor.createDoctor);
router.put("/doctors/:id_doctor", jwt.validateToken, controllerDoctor.updateDoctor);
router.delete("/doctors/:id_doctor", jwt.validateToken, controllerDoctor.deleteDoctor);

router.post("/user/register", controllerUser.createUser);
router.post("/users/login", controllerUser.loginUser);

export default router;
