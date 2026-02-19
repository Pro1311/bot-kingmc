const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// 1. WEB SERVER CHO RENDER
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot Deep_darkness dang treo 1.21.11...') })
const server = app.listen(port, '0.0.0.0', () => { console.log('Web Server Live!') })

// 2. CẤU HÌNH BOT (Tự động nhận diện phiên bản Server)
const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Deep_darkness', 
  version: false, // ĐỂ FALSE ĐỂ BOT TỰ NHẬN DIỆN PHIÊN BẢN (1.21.x)
  auth: 'offline',
  checkTimeoutInterval: 60000
})

bot.on('spawn', () => {
  console.log('--- Bot da vao Sanh cho! ---');
  
  // Bước 1: Login sau 10 giây (Tránh bị kick do gửi lệnh nhanh)
  setTimeout(() => {
    bot.chat('/login Andeptrai'); 
    console.log('Da gui mat khau login.');
  }, 10000);

  // Bước 2: Thao tác mở Menu (Phím 5 và Chuột phải) sau 25 giây
  setTimeout(() => {
    console.log('Bam phim 5 (Hotbar slot 4)...');
    bot.setQuickBarSlot(4); 
    
    setTimeout(() => {
      console.log('Chuot phai mo Menu...');
      bot.activateItem(); 
    }, 2000); 
  }, 25000); 
});

// Bước 3: Click vào ô KingSMP (Slot 24 - Hàng 3, Cột 7)
bot.on('windowOpen', (window) => {
  console.log('Menu da mo! Chuan bi click o 24...');
  setTimeout(() => {
    bot.clickWindow(24, 0, 0);
    console.log('Da Click vao KingSMP thành công!');
  }, 3000); 
});

// 3. CHỐNG AFK & RAO TIN (3 phút/lần)
setInterval(() => {
  if (bot.entity) {
    bot.look(bot.entity.yaw + 0.1, bot.entity.pitch, true);
    bot.chat('Ai pay t 50k t pay x2 uy tin');
    console.log('Da rao tin nhan len Global!');
  }
}, 180000);

// 4. SỬA LỖI TỰ ĐỘNG VÀO LẠI (BUỘC RENDER RESTART)
bot.on('end', (reason) => {
  console.log('Bot bi kick do: ' + reason);
  console.log('Dang cho 5s de Render tu khoi dong lai...');
  server.close();
  setTimeout(() => { process.exit(1); }, 5000); 
});

bot.on('error', err => {
  console.log('Loi: ', err);
  process.exit(1);
});
