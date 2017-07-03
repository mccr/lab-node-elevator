class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.requests = [];
    this.direction = 'none';
    this.waitingList = [];
    this.passengers = [];
    this.interval = undefined;
  }

  start() {
    this.stop();
    this.interval = setInterval(() => {
      this.update();
    }, 1 * 1000);
  }
  stop() {
    clearInterval(this.interval);
  }
  update() {
    this.checkFloor();
    switch(this.direction){
      case 'up':
        this.floorUp();
        break;
      case 'down':
        this.floorDown();
        break;
    }
    this.log();
  }

  checkFloor() {
    this._checkWaitingList();
    this._checkPassengerList();

    if (this.floor === this.requests[0]) this.requests.shift();
  }

  _checkWaitingList() {
    this.waitingList = this.waitingList.filter((p) => {
      let floorMatch = p.originFloor === this.floor;
      if (floorMatch) this._passengersEnter(p);
      return !floorMatch;
    });
  }

  _checkPassengerList() {
    this.passengers = this.passengers.filter((p) => {
      let floorMatch = p.destinationFloor === this.floor;
      if (floorMatch) this._passengersLeave(p);
      return !floorMatch;
    });
  }

  _passengersEnter(p) {
    console.log(`${p.name} has enter the elevator`);
    this.passengers.push(p);
    this.requests.push(p.destinationFloor);
  }
  _passengersLeave(p) {
    console.log(`${p.name} has left the elevator`);
    this.whichDirection();
  }
  floorUp() {
    if (this.floor < this.MAXFLOOR) this.floor++;
  }
  floorDown() {
    if (this.floor > 0) this.floor--;
  }
  call(person) {
    console.log(`${person.name} called from ${person.originFloor} to ${person.destinationFloor}`);
    this.requests.push(person.originFloor);
    this.waitingList.push(person);
    this.whichDirection();
    this.start();
  }
  log() {
    console.log(`Floor: ${this.floor} | Direction: ${this.direction}`);
  }

  whichDirection() {
    if (this.requests[0]) {
      this.direction = this.requests[0] > this.floor ? 'up' : 'down';
    } else {
      this.stop();
    }
  }
}

module.exports = Elevator;
