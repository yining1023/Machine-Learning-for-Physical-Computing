# Magic Wand with LEDs

- [Demo video](https://youtu.be/U8EDfUBn5H4)
- [Tutorial video: how to run it](https://www.loom.com/share/4a9b3cf76f0c44418fb44f0204bed477)

#### This is a contuniaution of the Magic Wand example, it lights up 3 different LEDs when it classfies the 3 gestures.

## Circuit board

Connect three LEDs on pin D2, D3, D4
![magicwand-led-circuit](../../images/magicwand-led-circuit.jpg)

- When "Wing" gesture is recognize, green LED lights up.
- When "Ring" gesture is recognize, yellow LED lights up.
- When "Slop" gesture is recognize, red LED lights up.

## Forked from [Tensorflow Lite example](https://github.com/tensorflow/tensorflow/edit/master/tensorflow/lite/micro/examples/magic_wand)

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

### Install the accelerometer driver

This example depends on the [Arduino_LSM9DS1](https://github.com/arduino-libraries/Arduino_LSM9DS1)
library to communicate with the device's accelerometer.

In the Arduino IDE, go to `Tools -> Manage Libraries...` and search for
`Arduino_LSM9DS1`. **Install version 1.1.0 of the library **.

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
follow the instructions in [magic_wand/train/README.md](https://github.com/tensorflow/tflite-micro/tree/main/tensorflow/lite/micro/examples/magic_wand/train/README.md).

## Troubleshooting

- Error compiling

  - Make sure to select the right board: Arduino Nano 33 BLE

- Error when compiling Arduino sketch: `Multiple libraries were found for "TensorFlowLite.h"`
  - There might ba a mismatch of the library version and example. Go to folder `Arduino/library`, find a folder called `Arduino_TensorFlowLite`, delete this folder, and try to install Arduino_TensorFlowLite library under Board Manager again.
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
