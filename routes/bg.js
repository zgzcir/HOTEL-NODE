/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:18:48
 * @LastEditTime: 2019-09-03 08:18:48
 * @LastEditors: your name
 */
// /*
//  * @Description: In User Settings Edit
//  * @Author: your name
//  * @Date: 2019-07-18 05:03:59
//  * @LastEditTime: 2019-09-06 13:31:10
//  * @LastEditors: Please set LastEditors
//  */
// const adminService = require('../service/admins')
// const inviteIDService = require('../service/inviteId')
// const memberService = require('../service/customer')
// const upload = require('./../service/upload')
// const auth = require('../middleware/auth')
// const appService = require('../service/apps')
// const app = require('express').Router()

// // app.post('/register', adminService.register)
//   // login 
// app.post('/login', adminService.login)
//   // profile
// app.get('/profile', auth, adminService.profile)
//   // create invite ID
// app.post('/createid', inviteIDService.create)
//   // 
// app.post('/uploadimg', upload)
// // add apps
// app.post('/addapps', appService.add)
// // query 
// app.post('/queryapps', appService.query)
// // query members by options
// app.post('/members', memberService.queryOptions)
// module.exports = app