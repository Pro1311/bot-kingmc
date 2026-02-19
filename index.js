const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// Giữ cho Render không bị tắt
app.get('/', (req, res) => { res.send('Bot AFK dang chay!') })
app.listen(3000)

const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Deep_darkness',
  version: '1.21.1',
  auth: 'offline'
})

bot.on('spawn', () => {
  console.log('Bot da vao KingMC!');
  setTimeout(() => {
    bot.chat('/login Andeptrai');
  }, 3000);

  setInterval(() => {
    const entity = bot.nearestEntity(e => e.type === 'mob');
    if (entity && bot.entity.position.distanceTo(entity.position)  { bot.chat('/stats'); }, 120000);
});

bot.on('end', () => {
  setTimeout(() => { process.exit(); }, 10000);
});
