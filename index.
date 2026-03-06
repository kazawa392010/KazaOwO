const express = require('express');
const path = require('path');
const app = express();

// Render sẽ cấp PORT ngẫu nhiên, nếu không có thì mặc định 3000
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Biến lưu trữ trạng thái để ESP32 và Web "gặp nhau"
let systemState = {
    relay: 0,           // 0: Tắt, 1: Bật
    message: "OwO Project", 
    humidity: 0,
    espIP: "0.0.0.0",
    lastSeen: 0         // Để kiểm tra Online/Offline
};

// --- API CHO ESP32 (POST dữ liệu lên và nhận lệnh về) ---
app.post('/api/esp-sync', (req, res) => {
    const { humidity, ip } = req.body;
    
    // Cập nhật dữ liệu từ ESP32 gửi lên
    systemState.humidity = humidity || 0;
    systemState.espIP = ip || "0.0.0.0";
    systemState.lastSeen = Date.now();

    // Trả về lệnh điều khiển cho ESP32 thực hiện
    // ESP32 sẽ nhận được: { "relay": 0/1, "message": "..." }
    res.json({
        relay: systemState.relay,
        message: systemState.message
    });
});

// --- API CHO WEB (Lấy trạng thái mới nhất) ---
app.get('/api/status', (req, res) => {
    const now = Date.now();
    // Nếu quá 10 giây không thấy ESP32 gửi tin nhắn thì coi là Offline
    const isOnline = (now - systemState.lastSeen) < 10000;
    
    res.json({
        ...systemState,
        status: isOnline ? "Online" : "Offline"
    });
});

// --- API CHO WEB (Gửi lệnh điều khiển xuống) ---
app.post('/api/control', (req, res) => {
    const { relay, message } = req.body;
    
    if (relay !== undefined) systemState.relay = relay;
    if (message !== undefined) systemState.message = message;
    
    res.json({ success: true, currentState: systemState });
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
