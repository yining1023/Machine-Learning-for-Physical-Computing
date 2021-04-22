#include <ArduinoBLE.h>

BLEService ledService("19B10000-E8F2-537E-4F6C-D104768A1214"); // BLE LED Service
// BLE LED Switch Characteristic - custom 128-bit UUID, read and writable by central
BLEByteCharacteristic switchCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);

int ledPin1 = 2;
int ledPin2 = 3;

void setup() {
  pinMode(ledPin1, OUTPUT);  // sets the pin as output
  pinMode(ledPin2, OUTPUT);
  Serial.begin(9600);        // initialize serial communications

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");

    while (1);
  }
    // set advertised local name and service UUID:
  BLE.setLocalName("LED");
  BLE.setAdvertisedService(ledService);

  // add the characteristic to the service
  ledService.addCharacteristic(switchCharacteristic);

  // add service
  BLE.addService(ledService);

  // set the initial value for the characeristic:
  switchCharacteristic.writeValue(0);

  // start advertising
  BLE.advertise();

  Serial.println("BLE LED Peripheral");
}
 
void loop() {
  // listen for BLE peripherals to connect:
  BLEDevice central = BLE.central();

  
  // if a central is connected to peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());

    // while the central is still connected to peripheral:
    while (central.connected()) {
      // if the remote device wrote to the characteristic,
      // use the value to control the LED:
      if (switchCharacteristic.written()) {
        int inByte = switchCharacteristic.value();
        if (inByte == 1) {
           digitalWrite(ledPin1, HIGH);  // use it to turn on the LED 1
           digitalWrite(ledPin2, LOW);
         } else if (inByte == 2) {
           digitalWrite(ledPin2, HIGH);  // use it to turn on the LED 2
           digitalWrite(ledPin1, LOW);
         } else {
           digitalWrite(ledPin1, LOW);  // sets the LED off
           digitalWrite(ledPin2, LOW);  // sets the LED off
         }
      }
    }

    // when the central disconnects, print it out:
    Serial.print(F("Disconnected from central: "));
    Serial.println(central.address());
  }
}
