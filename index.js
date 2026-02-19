const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// 1. Giữ cho Render không ngủ
app.get('/', (req, res) => {
  res.send('Bot AFK dang dung yen giu farm!')
})
app.listen(3000, () => {
  console.log('Web Server da san sang!')
})

function createBot() {
  const bot = mineflayer.createBot({
    host: 'kingmc.vn',
    username: 'Deep_darkness',
    version: false, // auto detect version cho ổn định hơn
    auth: 'offline'
  })

  let intervals = []

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min
  }

  bot.on('spawn', () => {
    console.log('Bot da vao server va dang AFK!')

    // Login sau 3 giây
    setTimeout(() => {
      bot.chat('/login Andeptrai')
    }, 3000)

    // Xoay camera nhẹ
    const lookInterval = setInterval(() => {
      let yaw = bot.entity.yaw + randomBetween(-0.5, 0.5)
      let pitch = bot.entity.pitch + randomBetween(-0.2, 0.2)

      // Giới hạn pitch tránh bug
      pitch = Math.max(-1.5, Math.min(1.5, pitch))

      bot.look(yaw, pitch, true)
    }, 5000)

    // Nhảy nhẹ
    const jumpInterval = setInterval(() => {
