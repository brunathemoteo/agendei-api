import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js";

const router = Router();

router.get("/doctors", controllerDoctor.listDoctors);
router.post("/doctors", controllerDoctor.createDoctor);
router.put("/doctors/:id_doctor", controllerDoctor.updateDoctor);
router.delete("/doctors/:id_doctor", controllerDoctor.deleteDoctor);

export default router;
