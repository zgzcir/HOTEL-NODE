/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 10:41:09
 * @LastEditTime: 2019-08-09 17:10:22
 * @LastEditors: Please set LastEditors
 */
const apps = require('./../dao/apps')

const appService = {}

appService.add = async (req, res) => {
  let field = req.body
  if(field.name == undefined) {
    return res.send({
      message: '请传入参数'
    })
  }
  await apps.add(field)
    .then(state => {
      if (state.affectedRows) {
        return res.send({
          state: true,
          message: '新增应用成功'
        })
      } else {
        return res.send({
          state: false,
          message: '数据库更新失败'
        })
      }
    })
    .catch(err => {
      return res.status(500).send({
        state: false,
        message: '数据库更新出错'
      })
    })
}

appService.query = async (req, res) => {
  let field = req.body
  apps.query(field)
    .then(data => {
      if (data.length) {
        res.send({
          state: true,
          data: data
        })
      } else {
        return res.send({
          state: false,
          message: '该分类暂无数据'
        })
      }
    })
    .catch(err => {
      return res.status(500).send({
        state: false, 
        message: '数据查询出错'
      })
    })
}

appService.delete = async (req, res) => {
  let field = req.body
  apps.delete(field)
    .then(state => {
      if (state.affectedRows) {
        return res.send({
          state: true,
          message: '已删除'
        })
      } else {
        return res.send({
          state: false,
          message: '数据库更新失败'
        })
      }
    })
    .catch(err => {
      return res.status(500).send({
        state: false,
        message: '数据库更新出错'
      })
    })
}

module.exports = appService