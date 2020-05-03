# ABC Gestures Classification
This is a tutorial of training 3 gestures instead of 2(flex, punch) from the [Gesture2Emoji](../GestureToEmoji) workshop. You can follow this tutorial to see how can we train more than 2 gestures classifier. You can also modify it to train any number of gestures you like. But make sure each class are distinct from each other.

## Demo
Classify "A", "B", "C", "D" gestures.
[video]()

## How to Run it
A [video]() of how to run this workshop

## 0. What do you need
Arduino Nano 33 BLE Sense (and its USB cable), Laptop

## 1. Collect data
- Open the [IMU_Classifier](/ArduinoSketches/IMU_Capture) sketch in Arduino, select the board and port, upload it to your Arduino Nano 33 BLE sense board.
- Open the serial port, start performing gesture "A" for more than 15 times, Arduino will detect the sudden movement and start recording the accelerometer and gyroscope data for 1 second, you should be able to see 119 lines of aX,aY,aZ,gX,gY,gZ numbers in the serial monitor. Copy the output from the serial monitor and save it in a "a.csv" file.
- Clear the serial montior, press the reset button on the board, repeat the process for gesture "B" and "C".
- In the end, we will have 3 .csv files: "a.csv", "b.csv", "b.csv"

## 2. Train the model
Open this google colab, 
To train our own classes, we need to change the Gesture class.


## 3. Run the model
