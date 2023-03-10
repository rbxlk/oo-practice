import { Car } from "../classes/car.js";
import { DataError } from "./data-error.js";

export class FleetDataService {
    constructor() {
        this.cars = [];
        this.drones = [];
        this.errors = [];
    }

    loadData(fleet) {
        for(let data of fleet){
            switch (data.type) {
                case 'car':
                    if (this.validateCarData(data)){
                        let car = this.loadCar(data);
                        if(car){
                            this.cars.push(car);
                        }
                    } 
                    else {
                        let e = new DataError('invalid car data', data);
                        this.errors.push(e);
                    }
                    break;
                case 'drone':
                    this.drones.push(data);
                    break;
                default:
                    let e = new DataError('Invalid vehicle type', data);
                    this.errors.push(e);
                    break;
            }
        }
    }

    loadCar(car) {
        try {
            let c = new Car(car.license, car.model, car.latLong);
            c.miles = car.miles;
            c.make = car.make;
            return c;
        } catch (error) {
            this.errors.push(new DataError('error loading car', error));
        }
        return null;
    }

    validateCarData(car) {
        let requiredProps = 'license model latLong miles make'.split(' ');
        let hasErrors = false;

        for (const field of requiredProps) {
            if(!car[field]){
                this.errors.push(new DataError(`invalid field ${field}`, car))
                hasErrors = true;
            }
        }
        if(Number.isNaN(Number.parseFloat(car.miles))) {
            this.errors.push(new DataError('invalid mileage', car));
            hasErrors = true;
        }

        return !hasErrors;
    }

    getCarByLicense(license){
        return this.cars.find((car) => {
            return car.license === license;
        })
    }

    getCarsSortedByLicense(){
        return this.cars.sort((car1, car2) => {
            if(car1.license < car2.license){
                return -1;
            }
            if(car1.license > car2.license){
                return 1;
            }
            return 0;
        })
    }

    filterCarsByMake(filterString){
        return this.cars.filter(car => car.make.indexOf(filterString) >= 0);
    }
}