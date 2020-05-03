# Steps:
- [Download](https://www.arduino.cc/en/main/software) Arduino IDE
- [Download](https://github.com/p5-serial/p5.serialcontrol/releases) p5 serial app
- Upload Arduino code to the Arduino board (you can find it in the `SoundClassifier`/ `ImageClassifier` / `PoseClassifier` folder)
- Open p5 serial app(if cannot open, change firewall settings)

## Sound:
- Running this [p5 sketch](https://editor.p5js.org/yining/sketches/eHYnYa5BR) on p5 web editor, remember to update the `portName` and `mySoundModelURL`, and update class names to your own classes.
- [Demo](https://youtu.be/7xPDbbHCjLw)
- [Demo made by Cara Neels](https://vimeo.com/363431151)

## Image:
- Running this [p5 sketch](https://editor.p5js.org/yining/sketches/Ob8Zkf_FZ) on p5 web editor, remember to update the `portName` and `myImageModelURL`, and update class names to your own classes.
- [Demo](https://youtu.be/ZGafimlnLw8)

## Pose:
- Running this [p5 sketch](https://editor.p5js.org/yining/sketches/WqhmvWzoo) on p5 web editor, remember to update the `portName` and `poseModelUrl`, and update class names to your own classes.
- [Demo](https://youtu.be/2E0LpbdPjMs)

Trouble shooting:
- The models works in p5 web editor, but my LEDs are not lighted up
  1. Light up LEDs in the arduino code directly to test if there is anything wrong with the LEDs.
  2. Make sure p5 serialis working: There shouldn't be any error in the console. The p5 serial app should be open, but do NOT connect to the port inside of the p5 serial app, otherwise p5 serial app will be using the port, then p5 web editor cannot use the port.
  3. You can find your portname in the p5 serial app. But there is no need to connect to the port in the p5 serial app.
  4. When you are re-uploading Arduino sketch, you need to stop p5 sketch in the editor and close the p5 serial app.
  
