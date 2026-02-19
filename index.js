const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// 1. WEB SERVER (GIỮ RENDER ONLINE)
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot Deep_darkness dang treo tai KingSMP...') })
app.listen(port, '0.0.0.0', () => { console.log('Web Server Live!') })

// 2. CẤU HÌNH KẾT NỐI
const botOptions = {
  host: 'kingmc.vn',
  username: 'Deep_darkness', 
  version: '1.21.1',
  auth: 'offline'
}

let bot;

function createBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot da vao Sanh cho!');
    
    // Bước 1: Login sau 5 giây
    setTimeout(() => {
      bot.chat('/login Andeptrai'); 
      console.log('Da gui mat khau login.');
    }, 5000);

    // Bước 2: Thao tác mở Menu (Phím 5 và Chuột phải) sau 15 giây
    setTimeout(() => {
      console.log('Bam phim 5 (Hotbar slot 4)...');
      bot.setQuickBarSlot(4); 
      
      setTimeout(() => {
        console.log('Chuot phai mo Menu...');
        bot.activateItem(); 
      }, 2000); 
    }, 15000); 
  });

  // Bước 3: Click vào ô KingSMP (Slot 24 - Hàng 3, Cột 7)
  bot.on('windowOpen', (window) => {
    console.log('Menu da mo! Dang tim o KingSMP...');
    setTimeout(() => {
      bot.clickWindow(24, 0, 0);
      console.log('Da Click vao KingSMP! Chuan bi rao keo...');
    }, 3000); 
  });

  // 3. RAO TIN NHẮN (3 phút/lần)
  setInterval(() => {
    if (bot.entity) {
      bot.look(bot.entity.yaw + 0.1, bot.entity.pitch, true);
      bot.chat('Ai pay t 50k t pay x2 uy tin');
      console.log('Da rao tin nhan.');
    }
  }, 180000);

  // 4. SỬA LỖI TỰ ĐỘNG VÀO LẠI SAU 5 GIÂY
  bot.on('end', () => {
    console.log('Mat ket noi! Dang cho 5 giay de vao lai...');
    setTimeout(() => {
      process.exit(); // Thoát để Render tự khởi động lại ngay lập tức
    }, 5000);
  });

  bot.on('error', err => {
    console.log('Loi: ', err);
    // Nếu gặp lỗi kết nối, cũng thoát để Render restart sau 5s
    setTimeout(() => { process.exit(); }, 5000);
  });
}

createBot();
