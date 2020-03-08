const tryDecorator = require('../middleware/try-decorator');
const serializer = require('../serializers/rides');

const { statusCodes } = require('../helpers/constants');
class RidesController {
    constructor(ridesService) {
        this.ridesService = ridesService;

        this.getRides = tryDecorator(this.getRidesRaw.bind(this));
        this.getRide = tryDecorator(this.getRideRaw.bind(this));
    }

    async getRidesRaw(req, res) {
        const rides = await this.ridesService.getRides();
        const responseBody = serializer.getRides.toResponse(rides);

        res.status(statusCodes.OK).send(responseBody);
    }

    async getRideRaw(req, res) {
        const { rideId } = req.params;

        const ride = await this.ridesService.getRide(rideId);
        const responseBody = serializer.getRide.toResponse(ride);

        res.status(statusCodes.OK).send(responseBody);
    }
    async insertRide(req, res) {
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;


    }


}

module.exports = RidesController;