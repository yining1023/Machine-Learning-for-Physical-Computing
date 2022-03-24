# Magic Wand

- [Demo video](https://youtu.be/E42RYOEqfyA)
- See another [demo video](https://create.arduino.cc/projecthub/404-team/magic-wand-885613) from Arduino project hub

## [Magic Wand Step-by-step Tutorial on Codelab](https://codelabs.developers.google.com/magicwand#0)

This is a tutorial that uses Arduino_LSM9DS1 library version 1.1.0 and Arduino_TensorFlowLite library 2.1.0-ALPHA.

Once you open the serial montion, it will be blank, until it recogize a gesture.

You need to point the port side to yourself to perform gestures.

I found it's easy to get the "Slope" gesture, but hard to get the "Ring" and "Wing" getures.

## Guide

This Guide uses the old Arduino_LSM9DS1 library version 1.0.0 and Arduino_TensorFlowLite library 1.14.0-ALPHA.

It requires to patch the Arduino_LSM9DS1 library.

When you open the serial montion, it will show "Magic starts!"

You need to point the port side to your left side to perform gestures.

I found it's easy to get the "Wing" and "Slope" gesture.

Forked from [Tensorflow Lite example](https://github.com/tensorflow/tensorflow/edit/master/tensorflow/lite/micro/examples/magic_wand)

This example shows how you can use TensorFlow Lite to run a 20 kilobyte neural
network model to recognize gestures with an accelerometer. It's designed to run
on systems with very small amounts of memory, such as microcontrollers.

The example application reads data from the accelerometer on an Arduino Nano 33
BLE Sense or SparkFun Edge board and indicates when it has detected a gesture,
then outputs the gesture to the serial port.

## Table of contents

- [Getting started](#getting-started)
- [Deploy to Arduino](#deploy-to-arduino)
- [Train your own model](#train-your-own-model)

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

(Note: On Mac OS, the `Arduino/libraries` directory might live in `Documents/Arduino/libraries`)

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

Note: try perform the gesture within 1 second.

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
follow the instructions in [magic_wand/train/README.md](https://github.com/tensorflow/tflite-micro/tree/main/tensorflow/lite/micro/examples/magic_wand/train/README.md).

## Troubleshooting

- Problem: Error compiling

  Solution 1: Make sure to select the right board: Arduino Nano 33 BLE

  Solution 2: make sure you install the board maneger and the two libraries correctly.The example is tested on the following softwares and libraries:
  It works with -

  - Arduino IDE version 1.8.12
  - Arduino_TensorflowLite library version 2.1.0-ALPHA
  - Arduino_LSM9DS1 library version 1.1.0
    Or with older versions of the libraries -
  - Arduino IDE version 1.8.12
  - Arduino_TensorflowLite library version 1.14.0-ALPHA
  - Arduino_LSM9DS1 library version 1.0.0

- Problem: Error when compiling Arduino sketch: `Multiple libraries were found for "TensorFlowLite.h"`
  Solution: there might ba a mismatch of the library version and example. Go to folder `Arduino/library`, find a folder called `Arduino_TensorFlowLite`, delete this folder, and try to install Arduino_TensorFlowLite library under Board Manager again.

- Problem: when open serial montior, nothing shows up there, I cannot see "Magic starts!" text.

  Solution1: When you have Arduino_TensorFlowLite library 2.1.0-ALPHA, the serial monitor will be blank, once you perform gestures, it will print the gestures. It might be hard to get it to regconize gestures because it requires specific oritation and movement. You need to point the port side to yourself to perform gestures. Check out this [demo](https://codelabs.developers.google.com/codelabs/ai-magicwand#5).

  Solution2: You can also try an old version of Arduino_TensorFlowLite library 1.14.0-ALPHA, it will print out "Magic starts!" in the serial monitor.

- Problem: You can’t get the gestures to work.

  Solution: First, make sure the yellow LED is blinking, which indicates that inference is happening. If it isn’t, press the RST button. Next, make sure you’re holding the board in the correct orientation, as shown earlier.

  To learn the gestures, start with the “W,” which is the easiest to master. The “O” is a little more difficult because the circle needs to be quite smooth.

  Try finish the gestures in 1 second, be firm and fast. See demo video [here](https://youtu.be/E42RYOEqfyA).

- Problem: When flashing, the script hangs for a while at Sending Hello. and then prints an error.

  Solution: You need to hold down the button marked 14 while running the script. Hold down button 14, press the RST button, and then run the script, while holding the button marked 14 the whole time.

- Problem: After flashing, none of the LEDs are coming on.

  Solution: Try pressing the RST button or disconnecting the board from the programmer and then reconnecting it. If neither of these works, try flashing the board again.

- Problem: The LEDs are stuck on or off.

  Solution: It’s normal for the LEDs to stop flashing immediately after an inference, while the program waits for enough new data to be available. If the LED stops flashing for more than a few seconds, the program might have crashed. In that case, press the RST button.

## What's Next

- Once you get the result in the serial monitor, try to light up different LEDs for different gestures. To light up LEDs, go to Arduino file `arduino_output_handler.cpp` to change the code there.
