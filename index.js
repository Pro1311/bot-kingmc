const mineflayer = require('mineflayer')
const express = require('express')
const { SocksProxyAgent } = require('socks-proxy-agent')
const app = express()

// 1. GIỮ RENDER ONLINE (HEALTH CHECK)
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot Deep_darkness dang treo qua SOCKS4...') })
const server = app.listen(port, '0.0.0.0')

// 2. CẤU HÌNH PROXY SOCKS4 VIETTEL
const proxyUrl = 'socks4://171.237.48.53:1080'; 
const agent = new SocksProxyAgent(proxyUrl);

// 3. CẤU HÌNH BOT (TỰ ĐỘNG NHẬN DIỆN PHIÊN BẢN 1.21.11)
const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Deep_darkness', 
  version: false, 
  auth: 'offline',
  agent: agent, // Ép Bot đi qua Proxy Viettel của bạn
  connectTimeout: 45000 // Tăng thời gian chờ lên 45s để tránh Timeout
})

bot.on('spawn', () => {
  console.log('--- Bot da vao Sanh cho qua SOCKS4 thành công! ---');
  
  // Bước 1: Login sau 10 giây
  setTimeout(() => {
    bot.chat('/login Andeptrai'); 
    console.log('Da gui mat khau login.');
  }, 10000);

  // Bước 2: Thao tác mở Menu (Phím 5 và Chuột phải) sau 25 giây
  setTimeout(() => {
    console.log('Dang mo Menu...');
    bot.setQuickBarSlot(4); // Phím 5 tương ứng Slot 4
    setTimeout(() => { bot.activateItem(); }, 2000); 
  }, 25000);
});

// Bước 3: Click vào ô KingSMP (Slot 24 - Hàng 3, Cột 7)
bot.on('windowOpen', (window) => {
  setTimeout(() => {
    bot.clickWindow(24, 0, 0);
    console.log('Da Click vao KingSMP thành công!');
  }, 3000); 
});

// RAO TIN NHẮN MỖI 3 PHÚT (180,000ms)
setInterval(() => {
  if (bot.entity) {
    bot.look(bot.entity.yaw + 0.1, bot.entity.pitch, true);
    bot.chat('Ai pay t 50k t pay x2 uy tin');
    console.log('Da rao tin: "Ai pay t 50k t pay x2 uy tin"');
  }
}, 180000);

// TỰ ĐỘNG RESTART KHI BỊ KICK HOẶC LỖI PROXY
bot.on('end', (reason) => {
  console.log('Bot bi kick do: ' + reason + '. Dang cho 10s de Render restart...');
  server.close();
  setTimeout(() => { process.exit(1); }, 10000); 
});

bot.on('error', err => {
  console.log('Loi ket noi (Check Port 1080): ', err);
  process.exit(1);
});
