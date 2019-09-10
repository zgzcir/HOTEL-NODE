/*
 * @De scription: some service for members [register , login]
 * @Author: litle
 * @Date: 2019-08-03 22:50:02
 * @LastEditTime: 2019-09-05 09:03:27
 * @LastEditors: Please set LastEditors
 */

const customers = require('../dao/customers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils/utils')
const SECERT = require('../config/config').SECERT

const customerService = {}


customerService.improveIDInfor=async(req,res)=>{
let data=req.body;
try{
  const customIdQueryResult = await customers.byUsername(data.username)
  if (customIdQueryResult.length != 0) {
    const customAddResul = await customers.addIDInfor(data)
    if (customAddResul.affectedRows != 0) {
      return res.send({
        message : "improve success",
        state: true
      })
    }
    else{
      return res.send({
        message : "improve err",
        state: false
      })
    }
  }

} catch (e) {
  console.log(e)

}

  
}
/**
 * @description: add a new member
 *   1. check the inviteId is serviceable
 *   2. padding the inviteId type and add member's fadetime and createtime according type
 *   3. padding the member's name is exited
 *   4. encrypt member's password by bcrypt
 *   5. add member information by member.add
 *   6. err handle and res return
 * @param {req, res} [ name,ps,inviteId ] 
 * @return: res [token, member]
 */
customerService.register = async (req, res) => {
  const newMember = req.body
  let inviteIdType = ''
  try {
    const isInviteIDServiceable = await customers.byInviteId(
      newMember.inviteId
    )
    if (!isInviteIDServiceable.length) {
      return res.status(422).send({
        message: '邀请码不存在或已被使用'
      })
    } else {
      inviteIdType = isInviteIDServiceable[0].type
    }
  } catch (error) {
    console.log(error)
    return res.send({
      message: '服务器忙，请稍后重试'
    })
  }
  try {
    const isNameAccessable = await customers.byUsername(newMember.name)
    if (isNameAccessable.length) {
      return res.status(422).send({
        message: '用户名已存在'
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: '服务器忙，请稍后重试'
    })
  }
  try {
    if (inviteIdType !== '') {
      newMember.type = inviteIdType
      newMember.time = utils.formatDate()
      switch (inviteIdType) {
        case 'one':
          newMember.fade = utils.yearLater(1)
          break
        case 'two':
          newMember.fade = utils.yearLater(2)
          break
        case 'three':
          newMember.fade = utils.yearLater(3)
          break
        case 'forever':
          newMember.fade = null
          break
        default:
          newMember.fade = newMember.time
      }
      // password encryption by bcrypt
      if (newMember.ps) {
        newMember.ps = bcrypt.hashSync(newMember.ps, 10)
      }
      await customers.add(newMember)
        .then(async data => {
          if (data.affectedRows) {
            await customers.updateInviteId(
              newMember.time,
              newMember.name,
              newMember.inviteId
            ).then(data => {
              if (data.affectedRows) {
                return res.send({
                  data: newMember,
                  message: '会员注册成功'
                })
              }
            }).catch(err => {
              console.log(err)
              return res.send({
                data: newMember,
                message: '会员注册失败，请联系客服'
              })
            })
          } else {
            return res.send({
              data: newMember,
              message: '会员注册失败，请联系客服'
            })
          }
        })
        .catch(err => {
          console.log(err)
          return res.status(500).send({
            message: '服务器错误，请稍后再试'
          })
        })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: '服务器出错，请稍后再试'
    })
  }
}
/**
 * @description: service for members login
 * 1. check if the member's name exists
 * 2. check if the password is correct
 * 3. return the token and member's infomation
 * @param {Object, Object} [ name,password ] 
 * @return: {Object} [data:member,token,state]
 */
// memberService.login = async (req, res) => {

//   let memberInfo = req.body

//   try {
//     const isMemberNameExited = await member.byusername(
//       memberInfo.name
//     )
//     if(!isMemberNameExited.length) {
//       return res.status(422).send({
//         message: '用户名不存在'
//       })
//     }
//     const isPasswirdValid = await bcrypt.compareSync(
//       memberInfo.password,
//       isMemberNameExited[0].mPassword
//     )
//     if(!isPasswirdValid) {
//       return res.status(422).send({
//         message: '密码错误'
//       })
//     } else {
//       const token = jwt.sign({
//         id: String(isMemberNameExited[0].mName)
//       }, SECERT)
//       return res.send({
//         data: isMemberNameExited[0],
//         toekn: token,
//         state: true
//       })
//     }
//   } catch (error) {
//     console.log(error)
//     return res.status(500).send({
//       message: '服务器忙，请稍后再试'
//     })
//   }
// }

/**
 * @description: query data of members by options of type, name, right
 * @param {type} 
 * @return: [json]
 */
customerService.queryOptions = async (req, res) => {
  let {
    type,
    name,
    right
  } = req.body
  await customers.queryOption(type, name, right)
    .then(data => {
      if (data.length) {
        return res.send({
          state: true,
          data: data
        })
      } else {
        return res.send({
          state: false,
          message: '暂无符合查询条件的数据'
        })
      }
    })
    .catch(err => {
      console.log(err)
      return res.send({
        state: false
      })
    })
}



module.exports = customerService