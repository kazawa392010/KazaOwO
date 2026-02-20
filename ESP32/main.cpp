#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h> 

// Wifi
const char* NameWifi = "Khang Phat";
const char* PassWifi = "khangphat2010";
const char* UrlServer = "https://kazaowo.onrender.com/api/esp-sync";

// OLED
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// DHT
#define DHTPIN 4       
#define DHTTYPE DHT11  
DHT dht(DHTPIN, DHTTYPE);

const int MIST_PIN = 32;
float humidity = 0;
String TT_wifi = "Connecting...";
String messageFromServer = "No Msg"; // Lưu tin nhắn từ Web

void setup() {
  Serial.begin(115200);

  // Khởi tạo OLED trước để xem trạng thái
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { 
    Serial.println(F("OLED failed!"));
    for(;;);
  }
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.display();

  // Kết nối WiFi
  WiFi.begin(NameWifi, PassWifi);
  int i = 0;
  while (WiFi.status() != WL_CONNECTED && i < 15) { 
    delay(500);
    i++;
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    TT_wifi = NameWifi;
    Serial.println("\nWiFi Connected!");
  } else {
    TT_wifi = "Failed!";
  }

  pinMode(MIST_PIN, OUTPUT);
  digitalWrite(MIST_PIN, LOW);
  dht.begin();
}

void loop() {
  // 1. Đọc cảm biến
  humidity = dht.readHumidity();

  // 2. Giao tiếp với Server (Chỉ khi có WiFi)
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    client.setInsecure(); // Bỏ qua kiểm tra chứng chỉ SSL cho Render

    HTTPClient http;
    http.begin(client, UrlServer); // Sử dụng client đã setInsecure
    http.addHeader("Content-Type", "application/json");

    // Tạo gói JSON gửi đi
    JsonDocument sendDoc;
    sendDoc["humidity"] = isnan(humidity) ? 0 : (int)humidity;
    sendDoc["ip"] = WiFi.localIP().toString();

    String requestBody;
    serializeJson(sendDoc, requestBody);

    // Gửi POST
    int httpResponseCode = http.POST(requestBody);

    if (httpResponseCode > 0) {
      String response = http.getString();
      JsonDocument recvDoc;
      deserializeJson(recvDoc, response);

      // Nhận lệnh từ Web
      int relayCmd = recvDoc["relay"]; // 0 hoặc 1
      messageFromServer = recvDoc["message"] | "No Message"; 

      // Điều khiển Relay/Mạch phun sương
      if (relayCmd == 1) {
        digitalWrite(MIST_PIN, HIGH);
      } else {
        digitalWrite(MIST_PIN, LOW);
      }
    }
    http.end();
  }

  // 3. Cập nhật màn hình OLED
  display.clearDisplay();
  
  // Dòng 1: WiFi Status
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("Wifi: "); display.print(TT_wifi);
  display.drawLine(0, 12, 127, 12, WHITE);

  // Dòng 2: Độ ẩm
  display.setCursor(0, 20);
  display.setTextSize(2);
  display.print("H: "); 
  if (isnan(humidity)) display.print("--%"); 
  else { display.print((int)humidity); display.print("%"); }

  // Dòng 3: Tin nhắn từ Web
  display.setTextSize(1);
  display.setCursor(0, 48);
  display.print("Msg: "); display.print(messageFromServer);

  // Dòng 4: Trạng thái máy bơm (Vẽ icon nhỏ hoặc chữ)
  display.setCursor(90, 25);
  display.print(digitalRead(MIST_PIN) ? "ON" : "OFF");

  display.display();
  
  delay(2000); // Đợi 2 giây rồi lặp lại
}
