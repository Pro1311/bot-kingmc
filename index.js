const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const express = require('express')
const app = express()

// GIỮ CỔNG CHO RENDER (BẮT BUỘC)
const port = process.env.PORT || 3000
app.get('/', (req, res) => { res.send('Bot Deep_darkness dang vao SMP...') })
app.listen(port, '0.0.0.0')

const bot = mineflayer.createBot({
  host: 'kingmc.vn',
  username: 'Deep_darkness', // Đã đổi về acc chính của bạn
  version: '1.21.1',
  auth: 'offline'
})

bot.loadPlugin(pathfinder)

bot.on('spawn', () => {
  console.log('Bot Deep_darkness đã vào Sảnh chờ!');
  
  // 1. Đăng nhập sau 3 giây
  setTimeout(() => {
    bot.chat('/login Andeptrai'); 
    console.log('Đã gửi mật khẩu login.');
  }, 3000);

  // 2. Tự động đi tới NPC và Click vào cụm SMP
  setTimeout(() => {
    console.log('Đang tìm NPC SMP...');
    // Tìm NPC có tên chứa chữ 'smp' hoặc 'earth'
    const target = bot.nearestEntity(e => e.name && e.name.toLowerCase().includes('smp')) 
    
    if (target) {
      const mcData = require('minecraft-data')(bot.version)
      const movements = new Movements(bot, mcData)
      bot.pathfinder.setMovements(movements)
      
      // Đi tới sát NPC (khoảng cách 2 block)
      bot.pathfinder.setGoal(new goals.GoalFollow(target, 2))
      
      // Khi đến nơi thì Chuột phải vào NPC
      bot.on('goal_reached', () => {
        bot.activateEntity(target);
        console.log('Đã Click vào NPC SMP thành công!');
      });
    } else {
      // NẾU KHÔNG THẤY NPC, THỬ DÙNG LỆNH NHANH
      bot.chat('/smp'); 
      console.log('Không thấy NPC, đã thử dùng lệnh /smp');
    }
  }, 10000);
});

// Chống bị đá AFK khi đã vào cụm game
setInterval(() => {
  if (bot.entity) {
    bot.look(bot.entity.yaw + 0.5, bot.entity.pitch, true);
    bot.chat('/stats');
  }
}, 120000);

bot.on('end', () => { setTimeout(() => { process.exit(); }, 15000); });
bot.on('error', err => console.log('Lỗi: ', err));
