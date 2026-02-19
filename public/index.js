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
