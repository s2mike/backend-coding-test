const getRides = {
    toResponse: (rides) => rides.map(entry => ({
        rideId: entry.rideId,
        startLat: entry.startLat,
        startLong: entry.startLong,
        endLat: entry.endLat,
        endLong: entry.endLong,
        riderName: entry.riderName,
        driverName: entry.driverName,
        driverVehicle: entry.driverVehicle,
        created: entry.created
    })),
};

const getRide = {
    toResponse: (rides) => ({
        rideId: entry.rideId,
        startLat: entry.startLat,
        startLong: entry.startLong,
        endLat: entry.endLat,
        endLong: entry.endLong,
        riderName: entry.riderName,
        driverName: entry.driverName,
        driverVehicle: entry.driverVehicle,
        created: entry.created
    }),
};
module.exports = {
    getRides,
    getRide,
};