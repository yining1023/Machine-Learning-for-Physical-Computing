## Troubleshooting
- [Why the loss does not go down? Arduino tinyml workshop gesture classification](https://www.loom.com/share/ebee6b3a1f594fda84ed17bf33252e77)
- [How to train/run Google Colab? Arduino Tinyml Workshop Gesture classification](https://www.loom.com/share/a7cf8894e4c94b9cb30cb3d8cbd9a496)
- The loss from colab is always 0: you might only have one class, it needs to have at least 2 classes
- When collecting data from the serial monitior, uncheck "Show timestamp", so it doesn't include timestamp in your flex.csv file
- When compling "IMU_Classifier", "Error on compiling Arduino Nano 33 BLE", check the Arduino_TensorflowLite library version in your arduino IDE, it should be "2.1.0-ALPHA" without any "precomplied" label.
- Library version: Arduino_LSM9DS1 @1.1.0, Arduino_TensorflowLite @2.1.0-ALPHA

[Demo Video](https://www.loom.com/share/c504446e1d284736b9309986e2b2a4ed)

# Forked from [ArduinoTensorFlowLiteTutorials](https://github.com/arduino/ArduinoTensorFlowLiteTutorials)

# Machine Learning on Arduino
## TensorFlow Lite gesture training tutorial

In this tutorial we will teach a board to recognise gestures! We'll capture motion data from the [Arduino Nano 33 BLE Sense](https://store.arduino.cc/arduino-nano-33-ble-sense) board, import it into TensorFlow to train a model, and deploy a classifier onto the board using [TensorFlow Lite for microcontrollers](https://www.tensorflow.org/lite/microcontrollers/overview). 

### Credits

This tutorial is adapted from the [workshop](https://github.com/sandeepmistry/aimldevfest-workshop-2019) Sandeep Mistry, Arduino and Don Coleman, Chariot Solutions presented at AI/ML Devfest in September 2019. 




## Exercises

* [Exercise 1: Development Environment](exercises/exercise1.md)
* [Exercise 2: Connecting the Board](exercises/exercise2.md)
* [Exercise 3: Visualizing the IMU Data](exercises/exercise3.md)
* [Exercise 4: Gather the Training Data](exercises/exercise4.md)
* [Exercise 5: Machine Learning](exercises/exercise5.md)
* [Exercise 6: Classifying IMU Data](exercises/exercise6.md)
* [Exercise 7: Gesture Controlled USB Emoji Keyboard](exercises/exercise7.md)
* [Exercise 8: Next Steps](exercises/exercise8.md)


