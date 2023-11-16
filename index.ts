import { getObstacleEvents } from './computer-vision';

interface Events {
    [i: string]: boolean
}

interface AutonomousCar {
    isRunning?: boolean
    respond: (events: Events) => void
}

interface AutonomousCarProps {
    isRunning?: boolean
    steeringControl: Steering
}

interface Control {
    execute: (command: string) => void
}

interface Steering extends Control {
    turn: (direcction: string) => void
}

class SteeringControl implements Steering {
    execute(command: string) {
        console.log(`Exercuting: ${command}`);
    }
    turn(direcction: string){
        this.execute(`Turn ${direcction}`)
    }
}

class Car implements AutonomousCar {
    isRunning
    steeringControl
    
    constructor(props: AutonomousCarProps) {
        this.isRunning = props.isRunning
        this.steeringControl = props.steeringControl
    }

    respond(events: Events) {
        if(!this.isRunning) return console.log('This car is off');
        Object.keys(events).forEach((eventKey => {
            if(!events[eventKey]) return
            if(eventKey === 'ObstacleLeft') this.steeringControl.turn('right')
            if(eventKey === 'ObstacleRigth') this.steeringControl.turn('left')
        }))
    }
}

const steering = new SteeringControl()
const autonomousCar = new Car({ isRunning: true, steeringControl: steering })

autonomousCar.respond(getObstacleEvents())
//steering.turn('right')

//console.log(autonomousCar);
