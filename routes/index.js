/*
 * @Description: In User Settings Editpp
 * @Author: your name
 * @Date: 2019-09-03 08:18:48
 * @LastEditTime: 2019-09-09 16:30:07
 * @LastEditors: Please set LastEditors
 */
const adminService = require('../service/admin')
const orderService = require('./../service/order')
const roomService=require('./../service/room')
const goodsService=require('./../service/goods')
const auth = require('../middleware/auth')
const app = require('express').Router()

// register
// app.post('/register', customerService.register)

// login
app.post('/login', adminService.login)
// app.post('/improve', adminService.improveIDInfor)
app.post('/ordersbyidnum', orderService.GetAllByIdnum)
app.post('/orders', orderService.GetAll)
app.post('/updateorderstate',orderService.updateOrderState)
app.post('/booking',orderService.booking)

app.post('/roomstate',roomService.getRoomState)


app.post('/goods',goodsService.getGoods)



// profile
// app.get('/profile', auth, adminService.profile)
module.exports = app