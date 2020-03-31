int ledPin1 = 12;
int ledPin2 = 13;

void setup() {
  pinMode(ledPin1, OUTPUT);  // sets the pin as output
  pinMode(ledPin2, OUTPUT);
  Serial.begin(9600);        // initialize serial communications
}
 
void loop() {
 if (Serial.available() > 0) { // if there's serial data available
   int inByte = Serial.read();   // read it
   if (inByte == 1) {
     analogWrite(ledPin1, 255);  // use it to set the LED brightness
     analogWrite(ledPin2, 0);
   } else if (inByte == 2) {
     analogWrite(ledPin2, 255);  // use it to set the LED brightness
     analogWrite(ledPin1, 0);
   } else {
     analogWrite(ledPin1, 0);  // sets the LED off
     analogWrite(ledPin2, 0);  // sets the LED off
   }
   delay(200);                // waits
 }
}
