const client = mqtt.connect('wss://test.mosquitto.org:8081');

client.on("connect", () => {
    document.getElementById("trangthai").innerText = "Đã kết nối thành công!! :>>";
    client.subscribe("nhacuatui/trangthaiden");
});

// Hàm gửi tin nhắn MQTT
function batden(TT) {
    client.publish("nhacuatui/den_led", TT, { qos: 1, retain: false });
}

// Nhận tin nhắn từ ESP32 gửi lên
client.on("message", (topic, message) => {
    document.getElementById("p1").innerText = "Hộp thư: " + topic;
    document.getElementById("p2").innerText = "Nội dung: " + message.toString();
    // Ví dụ: ESP32 gửi về nhiệt độ hoặc xác nhận
    document.getElementById("p3").innerText = "Cập nhật lúc: " + new Date().toLocaleTimeString();
});

// Xử lý nút bấm
const nutDen = document.getElementById("den");

nutDen.addEventListener("click", function() {
    // Lấy trạng thái hiện tại từ attribute data-state
    let state = this.getAttribute("data-state");

    if (state === "OFF") {
        // Nếu đang tắt -> Bật
        batden("ON");
        this.style.backgroundColor = "hsl(154, 10%, 69%)"; // Đổi nền nút
        this.style.color = "#000"; // Đổi màu chữ cho dễ nhìn
        this.innerText = "Tắt Đèn";
        this.setAttribute("data-state", "ON");
    } else {
        // Nếu đang bật -> Tắt
        batden("OFF");
        this.style.backgroundColor = "hsl(0, 2%, 38%)"; // Về màu cũ
        this.style.color = "rgb(245, 242, 208)";
        this.innerText = "Bật Đèn";
        this.setAttribute("data-state", "OFF");
    }
});