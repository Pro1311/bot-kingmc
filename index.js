const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// 1. GIỮ CỔNG CHO RENDER (BẮT BUỘC)
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot Deep_darkness dang treo tai KingSMP...') })
app.listen(port, '0.0.0.0', () => { console.log('Web Server Live!') })

// 2. CẤU HÌNH KẾT NỐI BOT
const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Deep_darkness', 
  version: '1.21.1',
  auth: 'offline'
})

bot.on('spawn', () => {
  console.log('Bot da vao Sanh cho!');
  
  // Bước 1: Đăng nhập sau 3 giây
  setTimeout(() => {
    bot.chat('/login Andeptrai'); 
    console.log('Da gui mat khau login.');
  }, 3000);

  // Bước 2: Mở Menu chọn Server sau 10 giây (khi đã login xong)
  setTimeout(() => {
    console.log('Dang mo Menu de chon Server...');
    bot.setQuickBarSlot(0); // Chon o so 1 trong tui do (Vat pham Menu)
    bot.activateItem(); // Chuot phai de mo bang chon
  }, 10000);

  // Bước 3: Tu dong Click vao o KingSMP (O so 12 trong Menu)
  bot.on('windowOpen', (window) => {
    console.log('Da mo bảng chọn, dang click vao o KingSMP...');
    // O so 12 tuong ung voi so 11 trong code (vi may tinh dem tu 0)
    bot.clickWindow(11, 0, 0); 
    console.log('Da Click vao KingSMP thanh cong!');
  });
});

// CHỐNG BỊ ĐÁ AFK (Xoay camera và gõ lệnh mỗi 2 phút)
setInterval(() => {
  if (bot.entity) {
    bot.look(bot.entity.yaw + 0.2, bot.entity.pitch, true);
    bot.chat('/stats');
  }
}, 120000);

// TỰ ĐỘNG KẾT NỐI LẠI KHI BỊ LỖI
bot.on('end', () => {
  console.log('Mat ket noi, dang vao lai sau 15s...');
  setTimeout(() => { process.exit(); }, 15000);
});

bot.on('error', err => console.log('Loi: ', err));
