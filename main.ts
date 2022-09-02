/**
 * Functions to operate mhp-dc-motor-microbit.
 */
//% weight=10 color=#ff9900 icon="\uf1b9" block="mhp-dc-motor-microbit"

namespace majidHasanpour {
    /**
     * Enumeration of motor.
    */
    enum Motor {
        //% block="left"
        Left,
        //% block="right"
        Right,
        //% block="direct"
        Direct
    }

    /**
     * Enumeration of forward/reverse direction
    */
    enum Direction {
        //% block="forward"
        Forward,
        //% block="reverse"
        Reverse
    }

    export function startMotor(
        motor: Motor,
        direction: Direction,
        speed: number
    ): void {
        speed = Math.max(Math.min(100, speed), 0) * 10.23;

        let lSpeed = Math.round((speed * 100) / 100);
        let rSpeed = Math.round((speed * 100) / 100);

        if (motor == Motor.Left || motor == Motor.Direct) {
            if (direction == Direction.Forward) {
                pins.analogWritePin(AnalogPin.P0, lSpeed);
                pins.analogWritePin(AnalogPin.P8, 0);
            } else {
                pins.analogWritePin(AnalogPin.P0, 0);
                pins.analogWritePin(AnalogPin.P8, lSpeed);
            }
        }
        if (motor == Motor.Right || motor == Motor.Direct) {
            if (direction == Direction.Forward) {
                pins.analogWritePin(AnalogPin.P1, rSpeed);
                pins.analogWritePin(AnalogPin.P12, 0);
            } else {
                pins.analogWritePin(AnalogPin.P1, 0);
                pins.analogWritePin(AnalogPin.P12, rSpeed);
            }
        }
    }


    /**
    * Move robot to forward
    * @param speed speed of motor between 0 and 100. eg: 60
    */
    //% block="move forward |at speed%speed|\\%"
    //% speed.min=0 speed.max=100
    //% weight=80
    //% subcategory=Motor
    export function move(speed: number): void {
        startMotor(Motor.Direct, Direction.Forward, speed);
    }
    

    /**
    * Move robot to left
    * @param direction Move Forward or Reverse
    * @param speed speed of motor between 0 and 100. eg: 60
    */
    //% block="move right |at speed%speed|\\%"
    //% speed.min=0 speed.max=100
    //% weight=80
    //% subcategory=Motor
    export function goLeft(direction: Direction, speed: number): void {
        startMotor(Motor.Left, Direction.Forward, speed);
    }



    /**
    * Move robot to right
    * @param direction Move Forward or Reverse
    * @param speed speed of motor between 0 and 100. eg: 60
    */
    //% block="move right |at speed%speed|\\%"
    //% speed.min=0 speed.max=100
    //% weight=60
    //% subcategory=Motor
    export function goRight(direction: Direction, speed: number): void {
        startMotor(Motor.Right, Direction.Forward, speed);
    }

    /**
    * Move robot to reverse
    * @param speed speed of motor between 0 and 100. eg: 60
    */
    //% block="move reverse |at speed%speed|\\%"
    //% speed.min=0 speed.max=100
    //% weight=80
    //% subcategory=Motor
    export function back(speed: number): void {
        startMotor(Motor.Direct, Direction.Reverse, speed);
    }

    /**
    * Stop robot by coasting slowly to a halt or braking
    */
    //% blockId="stop" block="stopMotor"
    //% weight=60
    //% subcategory=Motor
    export function stopMotor(): void {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P8, 0);
        pins.digitalWritePin(DigitalPin.P1, 0);
        pins.digitalWritePin(DigitalPin.P12, 0);
    }

    export function measureSpeed(pin: AnalogPin): void {
        let speed: string = Math.round(pins.analogReadPin(pin) / 10.23).toString();
        basic.showString(speed);
    }
}
