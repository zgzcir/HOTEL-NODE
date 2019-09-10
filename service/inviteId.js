const utils = require('./../utils/utils')
const uuid = require('uuid')
const INVITEID = require('./../dao/inviteId')

/**
 * @description: 生成指定数量的邀请码
 * @param {type} 
 * @return: res
 */
const inviteIDSevice = {}

async function waitInsertRecord (idInfo) {
  let ids = {}
  ids.state = false
  ids.data = []
  
  let month = new Date().getMonth() + 1
  if(idInfo.count !== 0 && idInfo.type !== null) {
    for(let i =0; i < idInfo.count; i++) {
      (function () {
        idInfo.id = month.toString() + uuid.v4().slice(1,12).replace('-', '')
        idInfo.createTime = utils.formatDate()
        let temp = Object.assign({}, idInfo)
        ids.data.push(temp)
      })()
      try {
        const stateInfo = await INVITEID.create(idInfo)
        if(!stateInfo.affectedRows) {
          ids.state = false
          return ids
        }
        ids.state = true
      } catch (error) {
        ids.state = false
      }
    }
  } else {
    ids.state = false
  }
  return ids
}
inviteIDSevice.create = async (req, res) => {
  console.log(req.body)
  const idInfo = {}
  idInfo.count = parseInt(req.body.count)
  idInfo.type = req.body.type
  let ids = await waitInsertRecord(idInfo)
  if(idInfo.count <= 0 ) {
    return res.json({
      state: false,
      message: '传入的数量不能少于 1'
    })
  }
  if(ids.state) {
    return res.json({
      state: true,
      data: ids.data
    })
  } else {
    return res.json({
      state: false,
      message: '数据库更新数据出错'
    })
  }
}
module.exports = inviteIDSevice
