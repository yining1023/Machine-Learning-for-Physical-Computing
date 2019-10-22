# Machine Learning for Physical Computing

## COURSE DESCRIPTION

With Machine Learning models are getting smaller, and microcontrollers are getting more computing power, Machine Learning is moving towards edge devices. This class explores the idea of how machine learning algorithms can be used on microcontrollers along with sensor data to build Physical Computing projects.

In this class, we will learn about TensorFlow Lite, a library that allows you to run machine learning algorithms on microcontrollers. We will talk about common machine learning algorithms and techniques and apply them to build hands-on interactive projects that enrich our daily lives.

Students will learn to use pre-trained models, and re-train the models with sensor data. We are going to talk about Image Classification, Transfer Learning, Gesture and Speech Detection. For each topic, we will first discuss its history, theory, datasets, and applications, and then build simple experiments based on the topic.

Prospective students are expected to have taken Introduction to Physical Computing and Introduction to Computational Media course, or have equivalent programming experience with Arduino and JavaScript.

## OUTLINE:
Week 1 Introduction to Machine Learning
Week 2 Image Classification and Transfer Learning
Week 3 Run a model with Tensorflow Lite
Week 4 Train a model with Tensorflow Lite
Week 5 Gesture detection
Week 6 Speech recognition
Week 7 Final project presentation

### Week 1 Introduction to Machine Learning
#### Notes:
What’s Artificial Intelligence, Machine Learning, Deep learning?
Supervised Learning, Unsupervised Learning, Reinforcement Learning
Machine Learning output types: Regression, Classification, Clustering, Sequence prediction
Existing Machine Learning use cases and creative projects
Introduction to Tensorflow Lite
TensorFlow Lite for Microcontrollers
#### Workshop:
Run Tensorflow Lite Hello world example on Arduino: https://github.com/tensorflow/tensorflow/tree/master/tensorflow/lite/experimental/micro/examples/hello_world

### Week 2 Classification and Transfer Learning
#### Notes:
What is a teachable machine
How does teachable machine work
What is Transfer Learning
Existing projects about transfer learning

#### Workshop:
Run a classifier(image/pose/sound) with Teachable Machine, and send the results to Arduino to light up an LED
Code: https://github.com/yining1023/machine-learning-for-the-web/tree/master/week4-soundClassifier/teachableMachineArduino-sound

### Week 3 Run a model with Tensorflow Lite
#### Notes:
Understand the concept of a “machine learning model.”
What is a “pre-trained model”?
What does it mean to discuss the “architecture” of a machine learning model?
Define and diagram an artificial neural network.
#### Workshop:
Running person_detection example: https://github.com/tensorflow/tensorflow/tree/master/tensorflow/lite/experimental/micro/examples/person_detection

### Week 4 Train a model with Tensorflow Lite
#### Notes:
Understand the full story of building a ML model for classification or regression.
Understand how data is formatted and downloaded including CSV and JSON.
Consider how to frame the problem and collect data.
Understand critical questions to ask (e.g. Who is this for? What’s the context?)
Understand the questions to ask about sourcing and collecting data.
Learn how to prepare a data set, including how to normalize and properly format it.
#### Workshop:
How to Collecting IMU data on Arduino Nano 33 BLE Sense

### Week 5 Gesture detection
Diagram the components of a two layer "vanilla" neural network.
How to build a simple neural network in code
#### Workshop:
Gesture Controlled USB Emoji Keyboard on Arduino Nano 33 BLE Sense

### Week 6 Speech recognition
#### Workshop:
Running the micro_speech example on Arduino Nano 33: https://github.com/tensorflow/tensorflow/tree/master/tensorflow/lite/experimental/micro/examples/micro_speech

## Resources:
How-to Get Started with Machine Learning on Arduino
TensorFlow Lite for Microcontrollers
TensorFlow Lite example
TinyML Book
Tiny ml workshop
Intel-Pattern-Matching-Technology, Arduino 101 gesture recognition example
Google Coral
Machine Learning for Introductory Physical Computing Curriculal
The Big Benchmarking Roundup Getting started with machine learning and edge computing
