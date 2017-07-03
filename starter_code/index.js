const Elevator = require('./elevator.js');
const Person = require('./person.js');

let elevator = new Elevator();
elevator.call(new Person('Fran', 4, 8));
elevator.call(new Person('Ana', 3, 0));
elevator.call(new Person('Juan', 0, 9));
elevator.call(new Person('Mikel', 4, 10));
