const connection = require("../db");

class VehicleService {
  async getAll() {
    const [vehicles] = await connection.execute("SELECT * FROM vehicle");
    return vehicles;
  }

  async createVehicle(vehicle) {
    const { placa, chassi, renavam, modelo, marca, ano } = vehicle;
    const query =
      "INSERT INTO vehicle(placa, chassi, renavam, modelo, marca, ano) VALUES (?, ?, ?, ?, ?, ?)";

    const [createdVehicle] = await connection.execute(query, [
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
    ]);

    vehicle.id = createdVehicle.insertId;
    return vehicle;
  }

  async updateVehicle(id, vehicle) {
    const { placa, chassi, renavam, modelo, marca, ano } = vehicle;

    const query =
      "UPDATE vehicle SET placa = ?, chassi = ?, renavam = ?, modelo = ?, marca = ?, ano = ? WHERE id = ?";

    const [updatedVehicle] = await connection.execute(query, [
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
      id,
    ]);

    return updatedVehicle;
  }

  async deleteVehicle(id) {
    const [deletedVehicle] = await connection.execute(
      "DELETE FROM vehicle WHERE id = ?",
      [id]
    );
    return deletedVehicle;
  }
}

module.exports = new VehicleService();
