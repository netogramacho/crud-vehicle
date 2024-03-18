const VehicleService = require("../services/VehicleService");

class VehicleControler {
  async getAllVehicles(request, response) {
    let json = { error: "", result: [] };
    json.result = await VehicleService.getAll();

    response.send(json);
  }

  async getVehicleById(request, response) {
    const { id } = request.params;
    const json = await VehicleService.findOne(id);

    response.send(json);
  }

  async createVehicle(request, response) {
    const createdVehicle = await VehicleService.createVehicle(request.body);
    return response.status(201).json(createdVehicle);
  }

  async updateVehicle(request, response) {
    const { id } = request.params;

    await VehicleService.updateVehicle(id, request.body);
    return response.status(204).json();
  }

  async deleteVehicle(request, response) {
    const { id } = request.params;

    await VehicleService.deleteVehicle(id);
    response.status(204).send();
  }
}

module.exports = new VehicleControler();
