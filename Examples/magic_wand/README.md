# Magic Wand

- [Demo video](https://youtu.be/E42RYOEqfyA)
- See another [demo video](https://create.arduino.cc/projecthub/404-team/magic-wand-885613) from Arduino project hub

## Forked from [Tensorflow Lite example](https://github.com/tensorflow/tensorflow/edit/master/tensorflow/lite/micro/examples/magic_wand)

This example shows how you can use TensorFlow Lite to run a 20 kilobyte neural
network model to recognize gestures with an accelerometer. It's designed to run
on systems with very small amounts of memory, such as microcontrollers.

The example application reads data from the accelerometer on an Arduino Nano 33
BLE Sense or SparkFun Edge board and indicates when it has detected a gesture,
then outputs the gesture to the serial port.

## Table of contents

-   [Getting started](#getting-started)
-   [Deploy to Arduino](#deploy-to-arduino)
-   [Train your own model](#train-your-own-model)

## Deploy to Arduino

The following instructions will help you build and deploy this sample
to [Arduino](https://www.arduino.cc/) devices.

The sample has been tested with the following devices:

- [Arduino Nano 33 BLE Sense](https://store.arduino.cc/usa/nano-33-ble-sense-with-headers)

### Install the Arduino Nano 33 BLE Sense board manager
In the Arduino IDE menu select `Tools > Board > Boards Manager…`
Search for “Nano BLE” and press install on the board 
It will take several minutes to install. When it’s done close the Boards Manager window

### Install the Arduino_TensorFlowLite library

This example application is included as part of the official TensorFlow Lite
Arduino library. To install it, open the Arduino library manager in
`Tools -> Manage Libraries...` and search for `Arduino_TensorFlowLite`.

### Install and patch the accelerometer driver

This example depends on the [Arduino_LSM9DS1](https://github.com/arduino-libraries/Arduino_LSM9DS1)
library to communicate with the device's accelerometer. However, the library
must be patched in order to enable the accelerometer's FIFO buffer.

Follow these steps to install and patch the driver:

#### Install the correct version

In the Arduino IDE, go to `Tools -> Manage Libraries...` and search for
`Arduino_LSM9DS1`. **Install version 1.0.0 of the driver** to ensure the
following instructions work.

#### Patch the driver

The driver will be installed to your `Arduino/libraries` directory, in the
subdirectory `Arduino_LSM9DS1`.

Open the following file:

```
Arduino_LSM9DS1/src/LSM9DS1.cpp
```

Go to the function named `LSM9DS1Class::begin()`. Insert the following lines at
the end of the function, immediately before the `return 1` statement:

```cpp
// Enable FIFO (see docs https://www.st.com/resource/en/datasheet/DM00103319.pdf)
writeRegister(LSM9DS1_ADDRESS, 0x23, 0x02);
// Set continuous mode
writeRegister(LSM9DS1_ADDRESS, 0x2E, 0xC0);
```

Next, go to the function named `LSM9DS1Class::accelerationAvailable()`. You will
see the following lines:

```cpp
if (readRegister(LSM9DS1_ADDRESS, LSM9DS1_STATUS_REG) & 0x01) {
  return 1;
}
```

Comment out those lines and replace them with the following:

```cpp
// Read FIFO_SRC. If any of the rightmost 8 bits have a value, there is data
if (readRegister(LSM9DS1_ADDRESS, 0x2F) & 63) {
  return 1;
}
```

Next, save the file. Patching is now complete.

### Load and run the example

Once the library has been added, go to `File -> Examples`. You should see an
example near the bottom of the list named `TensorFlowLite`. Select
it and click `magic_wand` to load the example.

Use the Arduino Desktop IDE to build and upload the example. Once it is running,
you should see the built-in LED on your device flashing.

Open the Arduino Serial Monitor (`Tools -> Serial Monitor`).

You will see the following message:

```
Magic starts！
```

Hold the Arduino with its components facing upwards and the USB cable to your
left. Perform the gestures "WING", "RING"(clockwise), and "SLOPE", and you
should see the corresponding output:

```
WING:
*         *         *
 *       * *       *
  *     *   *     *
   *   *     *   *
    * *       * *
     *         *
```

```
RING:
          *
       *     *
     *         *
    *           *
     *         *
       *     *
          *
```

```
SLOPE:
        *
       *
      *
     *
    *
   *
  *
 * * * * * * * *
```

## Train your own model

To train your own model, or create a new model for a new set of gestures,
follow the instructions in [magic_wand/train/README.md](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/lite/micro/examples/magic_wand/train/README.md).


## Troubleshooting
- Error compiling
  Make sure to select the right board: Arduino Nano 33 BLE
- Error when compiling Arduino sketch: `Multiple libraries were found for "TensorFlowLite.h"`
  - There might ba a mismatch of the library version and example. Go to folder `Arduino/library`, find a folder called `Arduino_TensorFlowLite`, delete this folder, and try to install Arduino_TensorFlowLite library under Board Manager again.
 
