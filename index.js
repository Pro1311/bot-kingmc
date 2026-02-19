const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// Web Server để giữ Render không ngủ
app.get('/', (req, res) => { res.send('Bot AFK dang chay!') })
app.listen(3000)

const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Deep_darkness',
  version: '1.21.1',
  auth: 'offline'
})

// Chống bị đá AFK
bot.on('spawn', () => {
  console.log('Bot da vao KingMC!');
  setTimeout(() => {
    bot.chat('/login Andeptrai');
  }, 3000);

  // Xoay đầu nhẹ mỗi 5 giây
  setInterval(() => {
    bot.look(bot.entity.yaw + (Math.random() - 0.5), bot.entity.pitch + (Math.random() - 0.5), true)
  }, 5000);

  // Gõ lệnh mỗi 2 phút
  setInterval(() => { bot.chat('/stats'); }, 120000);
});

// Tự động vào lại nếu bị đá
bot.on('end', () => {
  console.log('Bot bi ngat, dang vao lai sau 10s...');
  setTimeout(() => { process.exit(); }, 10000);
});

bot.on('error', err => console.log('Loi:', err));
