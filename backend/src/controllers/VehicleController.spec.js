const sinon = require("sinon");
const assert = require("assert");
const VehicleController = require("./VehicleController");
const VehicleService = require("../services/VehicleService");

describe("VehicleController", function () {
  it("should return all vehicles", async function () {
    const vehicles = [
      { id: 1, model: "Civic" },
      { id: 2, model: "Accord" },
    ];
    sinon.stub(VehicleService, "getAll").resolves(vehicles);

    const request = {};
    const response = {
      send: sinon.stub(),
    };

    await VehicleController.getAllVehicles(request, response);

    assert.strictEqual(response.send.calledOnce, true);
    assert.deepStrictEqual(response.send.firstCall.args[0].result, vehicles);

    VehicleService.getAll.restore();
  });
  it("should return a single vehicle by id", async function () {
    const vehicleId = 1;
    const vehicle = { id: vehicleId, model: "Civic" };
    sinon.stub(VehicleService, "findOne").withArgs(vehicleId).resolves(vehicle);

    const request = { params: { id: vehicleId } };
    const response = {
      send: sinon.stub(),
    };

    await VehicleController.getVehicleById(request, response);

    assert.strictEqual(response.send.calledOnce, true);
    assert.deepStrictEqual(response.send.firstCall.args[0], vehicle);

    VehicleService.findOne.restore();
  });
  it("should create a new vehicle", async function () {
    const newVehicle = { model: "Civic" };
    const createdVehicle = { id: 1, ...newVehicle };
    sinon
      .stub(VehicleService, "createVehicle")
      .withArgs(newVehicle)
      .resolves(createdVehicle);

    const request = { body: newVehicle };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await VehicleController.createVehicle(request, response);

    assert.strictEqual(response.status.calledOnceWith(201), true);
    assert.deepStrictEqual(response.json.calledOnceWith(createdVehicle), true);

    VehicleService.createVehicle.restore();
  });
  it("should update an existing vehicle", async function () {
    const vehicleId = 1;
    const updatedVehicle = { id: vehicleId, model: "Accord" };
    sinon
      .stub(VehicleService, "updateVehicle")
      .withArgs(vehicleId, updatedVehicle)
      .resolves();

    const request = { params: { id: vehicleId }, body: updatedVehicle };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await VehicleController.updateVehicle(request, response);

    assert.strictEqual(response.status.calledOnceWith(204), true);
    assert.strictEqual(response.json.calledOnce, true);

    VehicleService.updateVehicle.restore();
  });
  it("should delete an existing vehicle", async function () {
    const vehicleId = 1;
    sinon.stub(VehicleService, "deleteVehicle").withArgs(vehicleId).resolves();

    const request = { params: { id: vehicleId } };
    const response = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    await VehicleController.deleteVehicle(request, response);

    assert.strictEqual(response.status.calledOnceWith(204), true);
    assert.strictEqual(response.send.calledOnce, true);

    VehicleService.deleteVehicle.restore();
  });
});
