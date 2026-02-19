const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// QUAN TRỌNG: Render cần cổng này để không tự tắt bot
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot Deep_darkness dang online!') })
app.listen(port, '0.0.0.0', () => { 
  console.log('Web Server dang chay tai cong ' + port) 
})

const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Deep_darkness', // Tên acc của bạn
  version: false, // Để server tự nhận diện bản 1.21.x
  auth: 'offline'
})

bot.on('spawn', () => {
  console.log('CHÚC MỪNG: Bot Deep_darkness đã vào KingMC!');
  // Đăng nhập sau 5 giây
  setTimeout(() => { 
    bot.chat('/login Andeptrai'); 
    console.log('Đã gửi mật khẩu: Andeptrai');
  }, 5000);
});

bot.on('end', () => {
  console.log('Bị server ngắt kết nối, đang thử lại sau 10s...');
  setTimeout(() => { process.exit(); }, 10000);
});

bot.on('error', err => console.log('Lỗi kết nối:', err));
