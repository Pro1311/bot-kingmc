const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// QUAN TRỌNG: Render cần cổng này để giữ bot online
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot AFK dang chay 24/7!') })
app.listen(port, () => { console.log('Web Server da san sang tren cong ' + port) })

const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Deep_darkness',
  version: '1.21.1',
  auth: 'offline'
})

bot.on('spawn', () => {
  console.log('Bot da vao KingMC!');
  setTimeout(() => { bot.chat('/login Andeptrai'); }, 3000);
  // Xoay dau nhe moi 5 giay
  setInterval(() => {
    bot.look(bot.entity.yaw + (Math.random() - 0.5), bot.entity.pitch + (Math.random() - 0.5), true)
  }, 5000);
  // Go lenh moi 2 phut
  setInterval(() => { bot.chat('/stats'); }, 120000);
});

bot.on('end', () => {
  console.log('Mat ket noi, dang vao lai...');
  setTimeout(() => { process.exit(); }, 10000);
});

bot.on('error', err => console.log('Loi:', err));
