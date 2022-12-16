import { Car } from "./classes/car.js";
import { Drone } from "./classes/drone.js";
import { fleet } from "./fleet-data.js";
import { FleetDataService } from "./services/fleet-data-service.js";

let dataService = new FleetDataService();
dataService.loadData(fleet);

let car = dataService.getCarByLicense('AT9900');
console.log(car);

let carFilter = dataService.filterCarsByMake('U');
carFilter.forEach(car => {
    console.log(car.make)
});

let cars = dataService.getCarsSortedByLicense();
for (const car of cars) {
    console.log(car.license);
}