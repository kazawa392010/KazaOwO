const express = require('express');
const path = require('path');
const app = express();

// 1. Cấu hình để phục vụ các file trong thư mục "public" (html, css, js client)
app.use(express.static(path.join(__dirname, 'public')));

// 2. Cấu hình Port linh hoạt cho Render
const PORT = process.env.PORT || 3000;

// 3. Route chính để trả về file index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
