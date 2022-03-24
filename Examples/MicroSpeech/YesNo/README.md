# Forked from [tflite examples](https://github.com/tensorflow/tflite-micro/tree/main/tensorflow/lite/micro/examples/micro_speech)

# Micro speech example

This example shows how you can use TensorFlow Lite to run a 20 kilobyte neural
network model to recognize keywords in speech. It's designed to run on systems
with very small amounts of memory such as microcontrollers and DSPs.

The example application listens to its surroundings with a microphone and
indicates when it has detected a word by lighting an LED or displaying data on a
screen, depending on the capabilities of the device.

The code has a small footprint (for example around 22 kilobytes on a Cortex
M3) and only uses about 10 kilobytes of RAM for working memory, so it's able to
run on systems like an STM32F103 with only 20 kilobytes of total SRAM and 64
kilobytes of Flash.

## Table of contents

- [Deploy to Arduino](#deploy-to-arduino)
- [Train your own model](#train-your-own-model)

## Deploy to Arduino

The following instructions will help you build and deploy this sample
to [Arduino](https://www.arduino.cc/) devices.

The sample has been tested with the following devices:

- [Arduino Nano 33 BLE Sense](https://store.arduino.cc/usa/nano-33-ble-sense-with-headers)

The Arduino Nano 33 BLE Sense is currently the only Arduino with a built-in
microphone. If you're using a different Arduino board and attaching your own
microphone, you'll need to implement your own +audio_provider.cc+. It also has a
built-in LED, which is used to indicate that a word has been recognized.

### Install the Arduino_TensorFlowLite library

This example application is included as part of the official TensorFlow Lite
Arduino library. To install it, open the Arduino library manager in
`Tools -> Manage Libraries...` and search for `Arduino_TensorFlowLite`.

### Load and run the example

Once the library has been added, go to `File -> Examples`. You should see an
example near the bottom of the list named `TensorFlowLite:micro_speech`. Select
it and click `micro_speech` to load the example.

Use the Arduino IDE to build and upload the example. Once it is running, you
should see the built-in LED on your device flashing. Saying the word "yes" will
cause the LED to remain on for 3 seconds. The current model has fairly low
accuracy, so you may have to repeat "yes" a few times.

The program also outputs inference results to the serial port, which appear as
follows:

```
Heard yes (201) @4056ms
Heard no (205) @6448ms
Heard unknown (201) @13696ms
Heard yes (205) @15000ms
```

The number after each detected word is its score. By default, the program only
considers matches as valid if their score is over 200, so all of the scores you
see will be at least 200.

When the program is run, it waits 5 seconds for a USB-serial connection to be
available. If there is no connection available, it will not output data. To see
the serial output in the Arduino desktop IDE, do the following:

1. Open the Arduino IDE
1. Connect the Arduino board to your computer via USB
1. Press the reset button on the Arduino board
1. Within 5 seconds, go to `Tools -> Serial Monitor` in the Arduino IDE. You may
   have to try several times, since the board will take a moment to connect.

If you don't see any output, repeat the process again.

## Training your own model

You can train your own model with some easy-to-use scripts. See
[training_a_model.md](https://github.com/tensorflow/tflite-micro/tree/main/tensorflow/lite/micro/examples/micro_speech/train) for instructions.
