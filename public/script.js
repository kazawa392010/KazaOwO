async function updateUI() {
    try {
        const res = await fetch('/api/status');
        const data = await res.json();

        document.getElementById('status-network').innerText = data.status;
        document.getElementById('status-network').style.color = data.status === "Online" ? "#10b981" : "#ef4444";
        document.getElementById('ipnetwork').innerText = data.espIP;
        document.getElementById('status-mach').innerText = data.relay === 1 ? "Đang Chạy" : "Đang Tắt";
        document.getElementById('status-mach').style.color = data.relay === 1 ? "#2563eb" : "#64748b";
    } catch (err) {
        console.error("Lỗi kết nối server");
    }
}

document.getElementById('on-off-mach').onclick = async () => {
    const currentStatus = document.getElementById('status-mach').innerText;
    const newState = currentStatus === "Đang Tắt" ? 1 : 0;

    await fetch('/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ relay: newState })
    });
    updateUI();
};

setInterval(updateUI, 2000);
updateUI();
