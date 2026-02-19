// Khai báo các nút
const reportBtn = document.getElementById('reportBtn');
const memberBtn = document.getElementById('memberBtn');
const controlBtn = document.getElementById('controlBtn');

// Khai báo các Box (Modal)
const modalOverlay = document.getElementById('modalOverlay'); // Box Báo cáo
const memberModal = document.getElementById('memberModal');   // Box Thành viên

// --- HÀM MỞ BOX ---
function openBox(modal, btn) {
    modal.style.display = 'flex';
    btn.classList.add('active'); // "Bật đèn" màu xanh cho nút
}

// --- HÀM ĐÓNG TẤT CẢ ---
function closeAll() {
    modalOverlay.style.display = 'none';
    memberModal.style.display = 'none';
    
    // "Tắt đèn" tất cả các nút
    reportBtn.classList.remove('active');
    memberBtn.classList.remove('active');
    controlBtn.classList.remove('active');
}

// Gán sự kiện mở cho nút Báo Cáo
reportBtn.onclick = () => openBox(modalOverlay, reportBtn);

// Gán sự kiện mở cho nút Thành Viên
memberBtn.onclick = () => openBox(memberModal, memberBtn);

// Xử lý nút đóng (Dấu X và nút Đóng ở footer)
document.querySelectorAll('.close-btn, .btn-close-modal').forEach(btn => {
    btn.onclick = closeAll;
});

// Đóng khi bấm ra vùng trống bên ngoài Box
window.onclick = (e) => {
    if (e.target === modalOverlay || e.target === memberModal) {
        closeAll();
    }
};
