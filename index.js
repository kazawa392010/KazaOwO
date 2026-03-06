const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let systemState = {
    relay: 0,           // 0: Tắt, 1: Bật
    espIP: "0.0.0.0",
    lastSeen: 0         
};

// API cho ESP32 sync dữ liệu
app.post('/api/esp-sync', (req, res) => {
    const { ip } = req.body;
    systemState.espIP = ip || "0.0.0.0";
    systemState.lastSeen = Date.now();

    // Trả về lệnh relay cho ESP32
    res.json({ relay: systemState.relay });
});

// API cho Web lấy trạng thái
app.get('/api/status', (req, res) => {
    const isOnline = (Date.now() - systemState.lastSeen) < 10000;
    res.json({
        ...systemState,
        status: isOnline ? "Online" : "Offline"
    });
});

// API cho Web điều khiển
app.post('/api/control', (req, res) => {
    const { relay } = req.body;
    if (relay !== undefined) systemState.relay = relay;
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
