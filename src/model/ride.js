//  This is a Constructor function taking age and passport 
//  as the paramaters
function Ride(startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle) {
    this.startLatitude = startLatitude;
    this.startLongitude = startLongitude;
    this.endLatitude = endLatitude;
    this.endLongitude = endLongitude;
    this.riderName = riderName;
    this.driverName = driverName;
    this.driverVehicle = driverVehicle;
}
// Sets the age
// 
//Ride.prototype.setAge = function (age) {
 //   this.age = age;
//};
// Checks whether the person is Adult based on the age
// 
Ride.prototype.isStartValid = function () {
    return this.startLatitude < -90 || this.startLatitude > 90 || this.startLongitude < -180 || this.startLongitude > 180 ? false : true;
};

Ride.prototype.isEndValid = function () {
    return this.endLatitude < -90 || this.endLatitude > 90 || this.endLongitude < -180 || this.endLongitude > 180 ? false : true;
};

//  Sets the Ride object to module.exports
// 
module.exports = Ride;