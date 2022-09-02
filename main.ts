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
        //% block="both"
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
    /**
      * Move individual motors forward or reverse
      * @param motor motor to drive
      * @param direction select forwards or reverse
      * @param speed speed of motor between 0 and 100. eg: 80
      */
    //% blockId="startMotor" block="startMotor%direction|direction%direction|at speed%speed|\\%"
    //% weight=50
    //% speed.min=0 speed.max=100
    //% subcategory=Motor
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
    * Move robot to left
    * @param direction Move Forward or Reverse
    * @param speed speed of motor between 0 and 100. eg: 60
    */
    //% blockId="mhp-goLeft" block="goLeft%direction|at speed%speed|\\%"
    //% speed.min=0 speed.max=100
    //% weight=80
    //% subcategory=Motor
    export function goLeft(direction: Direction, speed: number): void {
        startMotor(Motor.Left, direction, speed);
    }



    /**
    * Move robot to right
    * @param direction Move Forward or Reverse
    * @param speed speed of motor between 0 and 100. eg: 60
    */
    //% blockId="mhp-goRight" block="goRight%direction|at speed%speed|\\%"
    //% speed.min=0 speed.max=100
    //% weight=60
    //% subcategory=Motor
    export function goRight(direction: Direction, speed: number): void {
        startMotor(Motor.Right, direction, speed);
    }

    /**
    * Stop robot by coasting slowly to a halt or braking
    * @param mode Brakes on or off
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
