# ESP32 Integration Guide

## Hardware Setup

### Required Components
- ESP32 Development Board
- Water Level Sensor (Ultrasonic or Capacitive)
- Flow Velocity Sensor
- DHT22 Temperature/Humidity Sensor
- Rain Gauge
- GPS Module (NEO-6M)
- Solar Panel (5V)
- Li-ion Battery
- LoRa Module (SX1278)
- Relays and Power Management

## Arduino Code

### Libraries Required
```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "DHT.h"
#include <SoftwareSerial.h>
```

### Configuration

```cpp
// WiFi Configuration
const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";

// API Configuration
const char* serverAddress = "http://your-backend-url.com/api/sensors";
const char* stationId = "STATION_001";

// Pin Configuration
#define DHTPIN 4
#define DHTTYPE DHT22
#define WATER_LEVEL_PIN 34
#define FLOW_SENSOR_PIN 35
#define RAIN_GAUGE_PIN 32

// Sensor Objects
DHT dht(DHTPIN, DHTTYPE);
SoftwareSerial GPSSerial(16, 17); // RX, TX
```

### Main Loop

```cpp
void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  dht.begin();
  GPSSerial.begin(9600);
  
  // Wait for WiFi
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi Connected");
}

void loop() {
  // Read sensors
  float waterLevel = readWaterLevel();
  float flowVelocity = readFlowVelocity();
  float rainfall = readRainfall();
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  float battery = readBattery();
  float solarStatus = readSolarPanel();
  
  // Read GPS
  float gpsLat, gpsLon;
  readGPS(gpsLat, gpsLon);
  
  // Send to API
  sendSensorData(waterLevel, flowVelocity, rainfall, 
                 humidity, temperature, battery, 
                 solarStatus, gpsLat, gpsLon);
  
  // Wait 5 minutes before next reading
  delay(300000);
}

void sendSensorData(float wl, float fv, float rf, 
                    float hum, float temp, float bat,
                    float solar, float lat, float lon) {
  HTTPClient http;
  
  // Create JSON payload
  StaticJsonDocument<512> doc;
  doc["stationId"] = stationId;
  doc["waterLevel"] = wl;
  doc["flowVelocity"] = fv;
  doc["rainfall"] = rf;
  doc["humidity"] = hum;
  doc["temperature"] = temp;
  doc["battery"] = bat;
  doc["solarStatus"] = solar > 4.8 ? "charging" : "discharging";
  doc["communicationStatus"] = "connected";
  doc["loraSignal"] = readLoRaSignal();
  doc["esp32Status"] = "online";
  
  JsonObject gps = doc.createNestedObject("gpsCoordinates");
  gps["lat"] = lat;
  gps["lon"] = lon;
  
  doc["systemHealth"] = 98;
  doc["timestamp"] = getISO8601Time();
  
  // Serialize and send
  String payload;
  serializeJson(doc, payload);
  
  http.begin(serverAddress);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(payload);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Response: " + response);
  }
  http.end();
}

float readWaterLevel() {
  // Ultrasonic sensor: measure distance
  int reading = analogRead(WATER_LEVEL_PIN);
  float voltage = (reading / 4095.0) * 3.3;
  float distance = voltage * 100; // Convert to cm
  return distance / 100.0; // Convert to meters
}

float readFlowVelocity() {
  // Flow sensor: pulses per second
  int pulses = 0;
  for (int i = 0; i < 1000; i++) {
    if (digitalRead(FLOW_SENSOR_PIN)) {
      pulses++;
    }
    delayMicroseconds(1000);
  }
  return pulses * 0.001; // Convert to m/s
}

float readRainfall() {
  int tippingCount = digitalRead(RAIN_GAUGE_PIN);
  return tippingCount * 0.2; // Each tip = 0.2mm
}

void readGPS(float &lat, float &lon) {
  // Parse NMEA sentences from GPS module
  // Implementation depends on GPS library
}

float readBattery() {
  int reading = analogRead(35);
  return (reading / 4095.0) * 100; // Battery percentage
}

float readSolarPanel() {
  int reading = analogRead(36);
  return (reading / 4095.0) * 5.0; // Solar voltage
}

int readLoRaSignal() {
  // Read LoRa RSSI (signal strength)
  return -95; // Example value in dBm
}

String getISO8601Time() {
  // Get current time in ISO 8601 format
  time_t now = time(nullptr);
  struct tm* timeinfo = localtime(&now);
  char buffer[25];
  strftime(buffer, 25, "%Y-%m-%dT%H:%M:%SZ", timeinfo);
  return String(buffer);
}
```

## MQTT Integration (Alternative)

```cpp
#include <PubSubClient.h>

const char* mqtt_server = "mqtt-broker.example.com";
const int mqtt_port = 1883;
const char* mqtt_user = "username";
const char* mqtt_password = "password";
const char* mqtt_topic = "flood/sensors/STATION_001";

WiFiClient espClient;
PubSubClient client(espClient);

void setup_mqtt() {
  client.setServer(mqtt_server, mqtt_port);
}

void publish_mqtt_data() {
  if (!client.connected()) {
    client.connect("ESP32_STATION_001", mqtt_user, mqtt_password);
  }
  
  // Publish sensor data
  StaticJsonDocument<512> doc;
  // ... populate doc ...
  
  char buffer[512];
  serializeJson(doc, buffer);
  client.publish(mqtt_topic, buffer);
}
```

## Calibration

### Water Level Sensor
1. Place sensor in known depth of water
2. Record ADC readings
3. Create calibration table
4. Use linear interpolation for readings

### Flow Velocity Sensor
1. Measure pulse frequency at known velocities
2. Calculate calibration factor
3. Apply factor to real-time readings

### Rainfall Gauge
1. Count tipping events per mm of rain
2. Calibration typically done by manufacturer

## Power Management

### Deep Sleep
```cpp
void enter_deep_sleep() {
  // Sleep for 5 minutes
  esp_sleep_enable_timer_wakeup(5 * 60 * 1000000);
  esp_deep_sleep_start();
}
```

### Battery Monitoring
- Check battery level before each transmission
- Enter low-power mode when battery < 20%
- Reduce transmission frequency

## Troubleshooting

### WiFi Connection Issues
- Check SSID and password
- Verify WiFi signal strength
- Increase WiFi timeout

### API Connection Issues
- Verify API URL
- Check firewall/network settings
- Add certificate verification for HTTPS

### Sensor Reading Issues
- Calibrate sensors
- Check sensor connections
- Test with multimeter

## Deployment Checklist

- [ ] Sensors calibrated
- [ ] WiFi/MQTT configured
- [ ] API endpoint verified
- [ ] Power supply working
- [ ] GPS acquiring satellites
- [ ] Test data transmission
- [ ] Monitor logs for errors
- [ ] Set up alerts
