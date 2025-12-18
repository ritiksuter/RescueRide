import { Router } from "express";
import {
  getMyProfileController,
  updateMyProfileController,
  getMyVehiclesController,
  addVehicleController,
  updateVehicleController,
  deleteVehicleController,
} from "../controllers/user.controller.js";
import { verifyToken } from "../../shared/middlewares/verifyToken.js"; // adjust if your path is different

const router = Router();

router.get("/me", verifyToken, getMyProfileController);
router.put("/me", verifyToken, updateMyProfileController);

router.get("/me/vehicles", verifyToken, getMyVehiclesController);
router.post("/me/vehicles", verifyToken, addVehicleController);
router.put("/me/vehicles/:vehicleId", verifyToken, updateVehicleController);
router.delete("/me/vehicles/:vehicleId", verifyToken, deleteVehicleController);

export default router;
