const memberModal = document.getElementById('memberModal');
const btnMember = document.querySelectorAll('.btn-secondary')[0]; // Nút Thành Viên đầu tiên
const closeMemberBtn = document.getElementById('closeMemberBtn');
const footerCloseBtn = document.getElementById('footerCloseBtn');

// Mở Modal khi bấm vào nút Thành Viên
btnMember.onclick = function() {
    memberModal.style.display = 'flex';
}

// Đóng Modal khi bấm dấu X hoặc nút Đóng
const closeModal = () => memberModal.style.display = 'none';

closeMemberBtn.onclick = closeModal;
footerCloseBtn.onclick = closeModal;

// Đóng khi bấm ra ngoài vùng màu đen
window.onclick = function(event) {
    if (event.target == memberModal) {
        closeModal();
    }
}

const customizeBtn = document.getElementById("customizeBtn");
const modalOverlay = document.getElementById("modalOverlay");
const closeBtn = document.getElementById("closeBtn");

// Mở modal khi bấm nút Tùy chỉnh
customizeBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

// Đóng modal khi bấm nút X
closeBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

// Đóng modal khi bấm ra ngoài vùng màu đen
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});
