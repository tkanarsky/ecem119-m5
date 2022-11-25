// Class that encapsulates reading and unpacking data from a Arduino using Web Bluetooth API.
// It has six public floats, representing x, y, z acceleration and rotation.
// It has a method to connect to a Bluetooth device advertising service d29ddc51-60ad-4631-a52d-72dfeb397839,
// and subscribe to characteristic d29ddc51-60ad-4631-a52d-72dfeb397830, which contains a 24-byte array.
// Unpack the array into the six floats.
// Use the jspack library to unpack the data.

import jspack from "../jspack.min.js";

class Bluetooth {
    ax = 0;
    ay = 0;
    az = 0;
    rx = 0;
    ry = 0;
    rz = 0;

    history = [];
    last_gesture = null;

    // takes in button id. attach connect to button onclick
    constructor(button_id, state) {
        document.getElementById(button_id).onclick = this.connect.bind(this);
        this.state = state;
    }

    connect() {
        navigator.bluetooth.requestDevice({
            filters: [{ services: ['d29ddc51-60ad-4631-a52d-72dfeb397839'] }]
        })
            .then(device => {
                console.log('Connecting to GATT Server...');
                return device.gatt.connect();
            })
            .then(server => {
                console.log('Getting Service...');
                return server.getPrimaryService('d29ddc51-60ad-4631-a52d-72dfeb397839');
            })
            .then(service => {
                console.log('Getting Characteristic...');
                return service.getCharacteristic('d29ddc51-60ad-4631-a52d-72dfeb397830');
            })
            .then(characteristic => {
                console.log('Subscribing to Characteristic changes...');
                characteristic.startNotifications();
                characteristic.addEventListener('characteristicvaluechanged', this.handleNotifications.bind(this));
                this.state.connected = true;
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleNotifications(event) {
        const value = event.target.value;
        const data = new Uint8Array(value.buffer);
        const unpacked = jspack.Unpack('<ffffff', data);
        this.ax = unpacked[0];
        this.ay = unpacked[1];
        this.az = unpacked[2];
        this.rx = unpacked[3];
        this.ry = unpacked[4];
        this.rz = unpacked[5];
        if (this.history.length > 10) {
            this.history.shift();
        }
        this.history.push([this.ax, this.ay, this.az, this.rx, this.ry, this.rz]);
        this.detectGestures();
    }

    detectGestures() {
        // Determines average values of first half of history and second half of history.
        // If both averages are above a threshold, and averages have opposite signs, then gesture is detected.
        // If gesture is detected, then the appropriate callback is called.
        
        const avg_ax_first = this.history.slice(0, this.history.length / 2).reduce((a, b) => a + b[0], 0) / (this.history.length / 2);
        const avg_ax_second = this.history.slice(this.history.length / 2).reduce((a, b) => a + b[0], 0) / (this.history.length / 2);
        
        if (avg_ax_first > 0.25 && avg_ax_second < -0.25 && this.last_gesture != "up") {
            console.log("Flick up!");
            this.last_gesture = "up";
            if (this.state.active == "left") {
                this.state.leftPaddle.controlState = "up";
            } else {
                this.state.rightPaddle.controlState = "up";
            }
        } else if (avg_ax_first < -0.25 && avg_ax_second > 0.25 && this.last_gesture != "down") {
            console.log("Flick down!");
            this.last_gesture = "down";
            if (this.state.active == "left") {
                this.state.leftPaddle.controlState = "down";
            } else {
                this.state.rightPaddle.controlState = "down";
            }
        }
        
        const avg_ay_first = this.history.slice(0, this.history.length / 2).reduce((a, b) => a + b[1], 0) / (this.history.length / 2);
        const avg_ay_second = this.history.slice(this.history.length / 2).reduce((a, b) => a + b[1], 0) / (this.history.length / 2);

        if ((avg_ay_first > 0.5 && avg_ay_second < -0.5) 
            || (avg_ay_first < -0.5 && avg_ay_second > 0.5) && this.last_gesture != "side") {
            console.log("Flick sideways!");
            this.last_gesture = "side";
            if (this.state.active == "left") {
                this.state.leftPaddle.controlState = "gyro";
            } else {
                this.state.rightPaddle.controlState = "gyro";
            }
            
        }
    }

}

export { Bluetooth };