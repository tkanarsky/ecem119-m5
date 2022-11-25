// Firmware to publish IMU data as a BLE characteristic
// Browser will subscribe to it using the Web Bluetooth API.
// Largely inspired by 
// https://github.com/tigoe/BluetoothLE-Examples/blob/main/ \
// ArduinoBLE_library_examples/BLE_LIS3DH_accelerometer/BLE_LIS3DH_accelerometer.ino
// but using the LSM IMU library and publishing a single characteristic instead of multiple

#include <Arduino.h>
#include <ArduinoBLE.h>
#include <LSM6DS3.h>

// Initialize service publishing linear and angular motion values
// Choose arbitrary UUID
BLEService imuService("d29ddc51-60ad-4631-a52d-72dfeb397839");

// Array to store data read from IMU
float imuData[6] = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0};

float rx0 = 0, ry0 = 0, rz0 = 0;

// Create bytearray characteristic holding the most up-to-date value 
// published by the IMU. Reserve 24 bytes for the value - 6 floats of 4 bytes each.
BLECharacteristic imuDataChar("d29ddc51-60ad-4631-a52d-72dfeb397830", BLERead | BLENotify, 24);

void setup() {
  asm(".global _printf_float");
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);
  while (!IMU.begin()) { 
    delay(100); 
  }
  Serial.println("IMU initialized");
  while (!BLE.begin()) {
    delay(10);
  }
  Serial.println("BLE initialized");
  BLE.setLocalName("Pong Remote (tm)");
  BLE.setAdvertisedService(imuService);
  imuService.addCharacteristic(imuDataChar);
  BLE.addService(imuService);
  BLE.advertise();
  Serial.println("Began advertising");
  // Calibrate gyroscope by taking average over 1 second and setting zero offsets
  float rx = 0.0, ry = 0.0, rz = 0.0;
  for (int i = 0; i < 100; i++) {
    while (!IMU.gyroscopeAvailable()) { delay(1); }
    IMU.readGyroscope(rx, ry, rz);
    rx0 += rx;
    ry0 += ry;
    rz0 += rz;
    delay(10);
  }
  rx0 = rx0 / 100.0;
  ry0 = ry0 / 100.0;
  rz0 = rz0 / 100.0;
#ifdef DEBUG
  Serial.print("rx0: ");
  Serial.print(rx0);
  Serial.print(" ry0: ");
  Serial.print(ry0);
  Serial.print(" rz0: ");
  Serial.println(rz0);
#endif
}

void loop() {
  BLEDevice central = BLE.central();
  static char buf[100];
  while (central.connected()) {
    digitalWrite(LED_BUILTIN, HIGH);
    if (IMU.accelerationAvailable() && IMU.gyroscopeAvailable()) {
      IMU.readAcceleration(imuData[0], imuData[1], imuData[2]);
      IMU.readGyroscope(imuData[3], imuData[4], imuData[5]);
      // Apply gyroscope calibration 
      imuData[3] -= rx0;
      imuData[4] -= ry0;
      imuData[5] -= rz0;
      imuDataChar.writeValue((void*) imuData, 24);
#ifdef DEBUG
      // Print IMU data to buf
      snprintf(buf, 100, "a: %f %f %f g: %f %f %f", imuData[0], imuData[1], imuData[2], imuData[3], imuData[4], imuData[5]);
      Serial.println(buf);
#endif
    } else {
      delay(10);
    }
    delay(50);
  }
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}