const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// GIỮ CỔNG CHO RENDER (BẮT BUỘC)
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot Pro dang online!') })
app.listen(port, '0.0.0.0', () => { console.log('Web Server Live!') })

const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Pro_AFK_2026', // NÊN ĐỔI TÊN THẬT LẠ (Không dùng tên quá ngắn)
  version: '1.21.1',
  auth: 'offline',
  checkTimeoutInterval: 60000 // Tăng thời gian chờ để tránh bị lag đá
})

bot.on('spawn', () => {
  console.log('CHÚC MỪNG: Bot Pro đã vào KingMC!');
  // Đăng nhập sau 5 giây để server load xong
  setTimeout(() => { 
    bot.chat('/login MatKhauCuaBan'); // THAY MẬT KHẨU ACC "PRO" VÀO ĐÂY
  }, 5000);
});

// XOAY CAMERA ĐỂ GIẢ LÀM NGƯỜI THẬT
setInterval(() => {
  if (bot.entity) {
    bot.look(bot.entity.yaw + (Math.random() - 0.5), bot.entity.pitch + (Math.random() - 0.5), true)
  }
}, 7000);

bot.on('end', (reason) => {
  console.log('Bị ngắt kết nối vì: ' + reason);
  setTimeout(() => { process.exit(); }, 15000); // Khởi động lại sau 15 giây
});

bot.on('error', err => console.log('Lỗi: ', err));
