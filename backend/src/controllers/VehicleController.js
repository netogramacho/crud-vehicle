const VehicleService = require("../services/VehicleService");

class VehicleControler {
  async getAllVehicles(request, response) {
    let json = { error: "", result: [] };
    json.result = await VehicleService.getAll();

    response.send(json);
  }

  createVehicle(request, response) {
    response.send("create");
  }

  updateVehicle(request, response) {
    response.send("update");
  }

  async deleteVehicle(request, response) {
    const { id } = request.params;

    await VehicleService.deleteVehicle(id);
    response.status(204).send();
  }
}

module.exports = new VehicleControler();
