/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:18:48
 * @LastEditTime: 2019-09-06 13:35:23
 * @LastEditors: Please set LastEditors
 */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils/utils')
const admins=require('../dao/admins')

const SECRET = require('../config/config').SECERT

const adminService = {};
adminService.login = async (req, res) => {
  let data = req.body;
  try {
    const queRes = await admins.byName(data.adminName)
    if (queRes.length == 0) {
      const addRes = await admins.add(data)
      if (addRes.affectedRows != 0) {
        return res.send({
          message : "register success",
          state: true
        })
      }
    }
    else{
      const verifyRes=await admins.verifyByPassword(data.password)
      if(verifyRes.length==1)
      {      

        return res.send({
          message : "login success",
          state: true
        })
      }
      else{
        return res.send({
          message : "wrong id or pass",
          state: false
        })
      }
    }
  } catch (e) {
    console.log(e)
   return res.status(500).send({
       message: '服务器出错，请稍后再试'
     })
  }
}

// adminService.register = async (req, res) => {
//   const newAdmin = req.body;
//   const isAdminNameValid = await admin.byName(
//     newAdmin.adminName
//   )
//   console.log(isAdminNameValid)
//   if(isAdminNameValid.length) {
//     return res.status(422).send({
//       msssage: '用户名已存在'
//     })
//   } else {
//     // bcrypt 密码加密
//     if(newAdmin.adminPassword) {
//       newAdmin.adminPassword = bcrypt.hashSync(newAdmin.adminPassword, 10)
//     }
//  }
//   await admin.add(newAdmin)
//     .then(data => {
//       if(data.affectedRows) {
//         return res.send({
//           data: req.body,
//           message: '创建用户成功'
//         })
//       } else {
//         return res.send({
//           data: req.body,
//           message: '创建用户失败'
//         })
//       }
//     })
//     .catch(err => {
//       console.log(err)
//       return res.status(500).send({
//         message: '服务器出错，请稍后再试'
//       })
//     })
// };

// adminService.login =  async (req, res) => {
//   let adminInfo = req.body;
//   adminInfo.lastLoginTime = utils.formatDate()
//   const isAdminNameValid = await admin.byName(
//     adminInfo.adminName
//   )
//   if(!isAdminNameValid.length) {
//     return res.status(422).send({
//       message: '用户名不存在'
//     })
//   }
//   const isPasswordValid = await bcrypt.compareSync(
//     adminInfo.adminPassword,
//     isAdminNameValid[0].adminPassword
//   )
//   if(!isPasswordValid) {
//     return res.status(422).send({
//       message: '密码错误'
//     })
//   } else {
//     admin.updateLastLoginTime(adminInfo)
//     const token = jwt.sign({
//       id: String(isAdminNameValid[0].adminName)
//     },SECRET)
//     return res.send({
//       data: isAdminNameValid[0],
//       token: token,
//       state: true
//     })
//   }
// }

// adminService.profile = async (req, res) => {
//   const user = req.user
//   if(user) {
//     console.log(req.user)
//   }
//   return res.send({
//     data: user,
//     state: true
//   })
// }

module.exports = adminService