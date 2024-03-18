const assert = require("assert");
const sinon = require("sinon");
const VehicleService = require("./VehicleService");
const connection = require("../db");

describe("VehicleService", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should return all vehicles", async function () {
    const vehicles = [
      { id: 1, model: "Civic" },
      { id: 2, model: "Accord" },
    ];
    sinon.stub(connection, "execute").resolves([vehicles]);

    const result = await VehicleService.getAll();

    assert.deepStrictEqual(result, vehicles);
  });
  it("should return a single vehicle by id", async function () {
    const vehicleId = 1;
    const vehicle = { id: vehicleId, model: "Civic" };
    sinon.stub(connection, "execute").resolves([[vehicle]]);

    const result = await VehicleService.findOne(vehicleId);

    assert.deepStrictEqual(result, vehicle);
  });
  it("should create a new vehicle", async function () {
    const newVehicle = {
      id: 1,
      model: "Civic",
      placa: "ABC-1234",
      chassi: "123456",
      renavam: "123456789",
      modelo: "Civic",
      marca: "Honda",
      ano: 2022,
    };
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await VehicleService.createVehicle(newVehicle);

    assert.deepStrictEqual(result, newVehicle);
  });
  it("should update an existing vehicle", async function () {
    const vehicleId = 1;
    const updatedVehicle = {
      id: vehicleId,
      model: "Accord",
      placa: "DEF-5678",
      chassi: "987654",
      renavam: "987654321",
      modelo: "Accord",
      marca: "Honda",
      ano: 2023,
    };
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    const result = await VehicleService.updateVehicle(
      vehicleId,
      updatedVehicle
    );

    assert.deepStrictEqual(result, { affectedRows: 1 });
  });
  it("should delete an existing vehicle", async function () {
    const vehicleId = 1;
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    const result = await VehicleService.deleteVehicle(vehicleId);

    assert.deepStrictEqual(result, { affectedRows: 1 });
  });
});
