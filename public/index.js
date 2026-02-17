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
