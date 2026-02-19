const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// 1. GIỮ LẠI WEB SERVER TỐI GIẢN (ĐỂ RENDER KHÔNG TẮT BOT)
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot dang treo...') })
const server = app.listen(port, '0.0.0.0')

// 2. CẤU HÌNH BOT
const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Deep_darkness', 
  version: '1.21.1',
  auth: 'offline'
})

bot.on('spawn', () => {
  console.log('--- Bot da vao Sanh cho! ---');
  
  // Login sau 5s
  setTimeout(() => {
    bot.chat('/login Andeptrai'); 
    console.log('Da gui mat khau login.');
  }, 5000);

  // Mo Menu sau 15s
  setTimeout(() => {
    bot.setQuickBarSlot(4); // Phim 5
    setTimeout(() => { bot.activateItem(); }, 1500); 
  }, 15000);
});

// Click o 24 (Hang 3, Cot 7)
bot.on('windowOpen', (window) => {
  setTimeout(() => {
    bot.clickWindow(24, 0, 0);
    console.log('Da click vao KingSMP!');
  }, 3000);
});

// Rao tin nhan moi 3 phut
setInterval(() => {
  if (bot.entity) {
    bot.look(bot.entity.yaw + 0.1, bot.entity.pitch, true);
    bot.chat('Ai pay t 50k t pay x2 uy tin');
  }
}, 180000);

// 3. SỬA LỖI "THÀNH CÔNG GIẢ"
// Khi Bot bi kick, chung ta se bat buoc Render phai hien thi loi va Restart
bot.on('end', (reason) => {
  console.log('Bot bi kick do: ' + reason);
  console.log('Dang dong Web Server de Render biet va Restart...');
  server.close(); // Tat Web Server
  process.exit(1); // Thoat voi ma loi (De Render biet la that bai va phai chay lai)
});

bot.on('error', err => {
  console.log('Loi: ', err);
  process.exit(1);
});
