import network
import time
from machine import Pin
from umqtt.simple import MQTTClient

# --- CẤU HÌNH ---
WIFI_SSID = "Khang Phat"
WIFI_PASS = "khangphat2010"

# Sử dụng HiveMQ ổn định hơn
MQTT_BROKER = "broker.hivemq.com"
CLIENT_ID   = "ESP32_Kazawa_99" # Nên có số ngẫu nhiên để tránh trùng
TOPIC_NHAN  = b"nhacuatui/den_led"
TOPIC_GUI   = b"nhacuatui/trangthaiden"

led = Pin(2, Pin.OUT)

# --- HÀM KẾT NỐI WIFI ---
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(False) # Reset wifi
    time.sleep(0.5)
    wlan.active(True)
    
    if not wlan.isconnected():
        print('Đang kết nối Wi-Fi...')
        wlan.connect(WIFI_SSID, WIFI_PASS)
        
        timeout = 15 # Tăng lên 15 giây cho chắc
        start_time = time.time()
        while not wlan.isconnected():
            if time.time() - start_time > timeout:
                print("Kết nối Wi-Fi thất bại!")
                return False
            # Nháy LED báo hiệu đang kết nối
            led.value(not led.value())
            time.sleep(0.5)
            
    led.value(0) # Tắt LED sau khi xong
    print('Đã kết nối Wi-Fi:', wlan.ifconfig())
    return True

# --- HÀM XỬ LÝ TIN NHẮN ---
def callback_tin_nhan(topic, msg):
    lenh = msg.decode('utf-8')
    print("Nhận được:", lenh)
    
    if lenh == "ON":
        led.value(1)
        phan_hoi = "Đèn đang BẬT"
    elif lenh == "OFF":
        led.value(0)
        phan_hoi = "Đèn đang TẮT"
    else:
        phan_hoi = "Lệnh không xác định"
        
    client.publish(TOPIC_GUI, phan_hoi)

# --- CHƯƠNG TRÌNH CHÍNH VỚI CHẾ ĐỘ THỬ LẠI ---
if connect_wifi():
    client = MQTTClient(CLIENT_ID, MQTT_BROKER, keepalive=60)
    client.set_callback(callback_tin_nhan)
    
    lan_thu = 0
    max_lan_thu = 5
    ket_noi_thanh_cong = False

    while lan_thu < max_lan_thu:
        try:
            lan_thu += 1
            print("Đang kết nối MQTT (Lần {}/{})...".format(lan_thu, max_lan_thu))
            
            if client.connect() == 0:
                print("MQTT THÀNH CÔNG!")
                client.subscribe(TOPIC_NHAN)
                client.publish(TOPIC_GUI, "ESP32 Online!")
                ket_noi_thanh_cong = True
                break # Thoát vòng lặp thử lại nếu thành công
            
        except Exception as e:
            print("Lỗi kết nối:", e)
            print("Thử lại sau 5 giây...")
            time.sleep(5)

    if ket_noi_thanh_cong:
        try:
            while True:
                # Kiểm tra tin nhắn liên tục
                client.check_msg()
                time.sleep(0.1)
        except Exception as e:
            print("Mất kết nối MQTT đột ngột:", e)
    else:
        print("Đã thử 5 lần không thành công. Dừng hệ thống.")
else:
    print("Dừng do lỗi Wi-Fi.")
