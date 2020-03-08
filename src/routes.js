const router = require('express').Router();

const RidesController = require('./controllers/rides');
const RidesService = require('./services/rides');
const RidesDatasource = require('./services/rides/datasource');

const ridesController = new RidesController(new RidesService(new RidesDatasource()));

router.get('/rides', ridesController.getRides);
router.get('/rides/:rideId', ridesController.getRide);
router.get('/health', (req, res) => res.send('Healthy'));
router.post('/insertride', ridesController.insertRide);
module.exports = router;