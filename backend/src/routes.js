const express = require("express");
const router = express.Router();

const VehicleControler = require("./controllers/VehicleController");

router.get("/vehicle", VehicleControler.getAllVehicles);
router.post("/vehicle", VehicleControler.createVehicle);
router.put("/vehicle/:id", VehicleControler.updateVehicle);
router.delete("/vehicle/:id", VehicleControler.deleteVehicle);

module.exports = router;
