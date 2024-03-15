const connection = require("../db");

class VehicleService {
  async getAll() {
    const [vehicles] = await connection.execute("SELECT * FROM vehicle");
    return vehicles;
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
