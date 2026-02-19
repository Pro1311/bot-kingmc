const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow
const express = require('express')
const app = express()

// GIỮ CỔNG CHO RENDER
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot dang di chuyen vao SMP...') })
app.listen(port, '0.0.0.0')

const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Pro_AFK_2026', // Tên acc "Pro" của bạn
  version: '1.21.1',
  auth: 'offline'
})

bot.loadPlugin(pathfinder)

bot.on('spawn', () => {
  console.log('Bot da vao Sanh cho!');
  
  // 1. Đăng nhập
  setTimeout(() => {
    bot.chat('/login Andeptrai'); // THAY MẬT KHẨU CỦA BẠN
  }, 3000);

  // 2. Tự động đi tới NPC SMP và Click
  setTimeout(() => {
    // TÌM NPC HOẶC BLOCK CÓ CHỮ "SMP"
    const target = bot.nearestEntity(e => e.name && e.name.toLowerCase().includes('smp')) 
    
    if (target) {
      console.log('Da thay SMP, dang di toi...');
      const mcData = require('minecraft-data')(bot.version)
      const movements = new Movements(bot, mcData)
      bot.pathfinder.setMovements(movements)
      
      // Đi tới sát NPC (khoảng cách 2 block)
      bot.pathfinder.setGoal(new goals.GoalFollow(target, 2))
      
      // Khi đến nơi thì Chuột phải
      bot.on('goal_reached', () => {
        bot.activateEntity(target);
        console.log('Da click vao SMP!');
      });
    } else {
      // NẾU KHÔNG THẤY NPC, THỬ DÙNG LỆNH NHANH
      bot.chat('/smp'); 
    }
  }, 10000);
});

// Chống bị đá AFK khi đã vào được cụm SMP
setInterval(() => {
  if (bot.entity) {
    bot.look(bot.entity.yaw + 0.5, bot.entity.pitch, true);
    bot.chat('/stats');
  }
}, 120000);

bot.on('end', () => { setTimeout(() => { process.exit(); }, 15000); });
