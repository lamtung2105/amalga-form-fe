const express = require('express');
const path = require('path');
const app = express();

// Đường dẫn chứa file build của Angular
const outputPath = path.join(__dirname);

// Serve static files
app.use(express.static(outputPath, {
  maxAge: '1y',
  extensions: ['html']
}));

// Redirect tất cả request không phải file sang index.html
// (Fix lỗi path-to-regexp: dùng regex thay vì '*')
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(outputPath, 'index.html'));
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
