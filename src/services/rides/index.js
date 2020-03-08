const logger = require('../../helpers/logging');
var Ride = require("../../model/Ride.js");
const { check, validationResult } = require('express-validator');

class RidesService {
    constructor(ridesDatasource) {
        this.ridesDatasource = ridesDatasource;
    }



    async getAndCacheRecipe(recipeId) {
        const cachedRecipe = this.cache[recipeId];

        if (moment().utc().isAfter(cachedRecipe.refreshTime)) {
            const recipe = await this.recipesDatasource.getRecipe(cachedRecipe.filename);

            this.cache[recipeId] = {
                ...recipe,
                sha: recipeId,
                refreshTime: moment().utc().add(12, 'hours'),
            };
        }

        return this.cache[recipeId];
    }

    async getRides() {
        return this.ridesDatasource.getRides();
    }

    async getRide(rideId) {
        try {
            return this.ridesDatasource.getRides(rideId);
        } catch (err) {
            logger.error('error getting recipe', err);
            throw err;
        }
    }

    async insertRide(ride) {
        check(ride.startLatitude)
            .isInt({ min: -90, max: 90 })
            .error_code('VALIDATION_ERROR')
            .withMessage('Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
        check(ride.endLatitude).isInt({ min: -90, max: 90 })
            .error_code('VALIDATION_ERROR')
            .withMessage('End latitude must be between -90 - 90 and -180 to 180 degrees respectively');

        check(ride.startLongitude)
            .isInt({ min: -180, max: 180 });
        check(ride.endLongitude).isInt({ min: -180, max: 180 });
        check(ride.riderName)
            .isLength({ min: 1 })
            .error_code('VALIDATION_ERROR')
            .withMessage('Rider name must be a non empty string');

        check(ride.driverName)
            .isLength({ min: 1 })
            .error_code('VALIDATION_ERROR')
            .withMessage('Driver name must be a non empty string');

        check(ride.driverVehicle)
            .isLength({ min: 1 })
            .error_code('VALIDATION_ERROR')
            .withMessage('Driver Vehicle must be a non empty string');
        
        var values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];

        const result = db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
                if (err) {
                    return res.send({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }

                res.send(rows);
            });
        });
    }
}

module.exports = RidesService;