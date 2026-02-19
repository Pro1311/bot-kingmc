const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// 1. GIỮ CỔNG CHO WEB SERVER (Dùng để treo 24/7 trên Render/Replit)
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot Deep_darkness dang online!') })
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

  // Bước 2: Thao tác mở Menu (Ấn phím 5 và Chuột phải)
  setTimeout(() => {
    console.log('Dang bam phim 5 de chon Hotbar...');
    bot.setQuickBarSlot(4); // Slot 4 tương ứng phím số 5 trong game
    
    // Đợi 1 giây để server nhận diện rồi mới Chuột phải
    setTimeout(() => {
      console.log('Dang chuot phai mo Menu...');
      bot.activateItem(); 
    }, 1000);
  }, 10000);
});

// Bước 3: Tự động Click vào ô KingSMP khi Menu hiện lên
bot.on('windowOpen', (window) => {
  console.log('Menu da mo!');
  
  /* 
     Vị trí Hàng 3, Cột 7 tính toán như sau:
     (Hàng 3 - 1) * 9 + (Cột 7 - 1) = 2 * 9 + 6 = 24
  */
  const slotToClick = 24; 

  setTimeout(() => {
    // Click vào ô số 24 (Hàng 3, Cột 7)
    bot.clickWindow(slotToClick, 0, 0);
    console.log(`Da click vao o KingSMP (Slot ${slotToClick}) thanh cong!`);
  }, 2500); // Đợi 2.5 giây cho chắc chắn menu đã load xong
});

// 3. CHỐNG BỊ ĐÁ AFK (Xoay camera và gõ lệnh mỗi 2 phút)
setInterval(() => {
  if (bot.entity) {
    bot.look(bot.entity.yaw + 0.2, bot.entity.pitch, true);
    bot.chat('/stats');
  }
}, 120000);

// 4. TỰ ĐỘNG KẾT NỐI LẠI KHI BỊ LỖI HOẶC SERVER RESTART
bot.on('end', () => {
  console.log('Mat ket noi, dang vao lai sau 15s...');
  setTimeout(() => { process.exit(); }, 15000);
});

bot.on('error', err => {
  console.log('Loi: ', err);
  if (err.code === 'ECONNREFUSED') {
    console.log('Server bao tri hoac offline.');
  }
});
