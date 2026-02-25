// Khai báo các nút
const reportBtn = document.getElementById('reportBtn');
const memberBtn = document.getElementById('memberBtn');
const controlBtn = document.getElementById('controlBtn');

// Khai báo các Box (Modal)
const modalOverlay = document.getElementById('modalOverlay');
const memberModal = document.getElementById('memberModal');
const controlModal = document.getElementById('controlModal');
// --- HÀM MỞ BOX ---
function openBox(modal, btn) {
    modal.style.display = 'flex';
    btn.classList.add('active'); // "Bật đèn" màu xanh cho nút
}

divId = (id) => {
  return document.getElementById(`${id}`)
}

// --- HÀM ĐÓNG TẤT CẢ ---
function closeAll() {
    modalOverlay.style.display = 'none';
    memberModal.style.display = 'none';
    controlModal.style.display = 'none';
    
    // "Tắt đèn" tất cả các nút
    reportBtn.classList.remove('active');
    memberBtn.classList.remove('active');
    controlBtn.classList.remove('active');
}


reportBtn.onclick = () => openBox(modalOverlay, reportBtn);
memberBtn.onclick = () => openBox(memberModal, memberBtn);
controlBtn.onclick = () => openBox(controlModal, controlBtn);

// Xử lý nút đóng (Dấu X và nút Đóng ở footer)
document.querySelectorAll('.close-btn, .btn-close-modal').forEach(btn => {
    btn.onclick = closeAll;
});

// Đóng khi bấm ra vùng trống bên ngoài Box
window.onclick = (e) => {
    if (e.target === modalOverlay || e.target === memberModal || e.target === controlModal) {
        closeAll();
    }
};

// Thêm đoạn này vào cuối file index.js hiện tại của ông

async function updateDashboard() {
    try {
        const res = await fetch('/api/status');
        const data = await res.json();

        // Cập nhật UI từ dữ liệu Server
        document.getElementById('do-am').innerText = data.humidity + "%";
        document.getElementById('status-network').innerText = data.status;
        document.getElementById('ipnetwork').innerText = data.espIP;
        document.getElementById('status-mach').innerText = data.relay === 1 ? "Đang Chạy" : "Đang Tắt";

        // Đổi màu trạng thái Online/Offline
        const statusNode = document.getElementById('status-network');
        statusNode.style.color = data.status === "Online" ? "#10b981" : "#ef4444";

    } catch (err) {
        console.error("Không thể kết nối Server:", err);
    }
}

// Xử lý bấm nút Bật/Tắt trên Web
document.getElementById('on-off-mach').onclick = async () => {
    const currentText = document.getElementById('status-mach').innerText;
    const newRelayState = currentText === "Đang Tắt" ? 1 : 0;

    await fetch('/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ relay: newRelayState })
    });
    updateDashboard(); // Cập nhật lại UI ngay lập tức
};

// Xử lý gửi Lời Nhắn xuống OLED
document.getElementById('guiTB').onclick = async () => {
    const msg = document.getElementById('TB').value;
    if(!msg) return;

    await fetch('/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
    });
    alert("Đã gửi lời nhắn!");
};

// Cứ 2 giây cập nhật web một lần
setInterval(updateDashboard, 2000);

// doi anh 
var doianh = (arr_id) => {
  var id1 = arr_id[0]
  var id2 = arr_id[1]
  var id3 = arr_id[2]
  
  if (divId(id1).getAttribute('data-status') == '1') {
    divId(id2).style.display ="block";
    divId(id1).style.display ="none"
    divId(id2).setAttribute('data-status', '1');
    divId(id1).setAttribute('data-status', '0');
  } else if (divId(id2).getAttribute('data-status') == '1') {
    divId(id3).style.display ="block";
    divId(id2).style.display ="none"
    divId(id3).setAttribute('data-status', '1');
    divId(id2).setAttribute('data-status', '0');
  } else {
    divId(id1).style.display ="block";
    divId(id3).style.display ="none"
    divId(id1).setAttribute('data-status', '1');
    divId(id3).setAttribute('data-status', '0');
  }
};


