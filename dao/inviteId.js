/*
 * @Description: update, query, delete about table inviteId
 * @Author: litle
 * @Date: 2019-08-01 03:17:43
 * @LastEditTime: 2019-08-03 17:39:04
 * @LastEditors: Please set LastEditors
 */

const db_query = require("../common/connection");

const INVITEID = {}

/**
 * @description: 生成邀请码
 * @param {Object} [传入类型与生成数量] 
 * @return: datebase state
 */

INVITEID.create = async field => {
  const { type, id, createTime } = field
  const sql = `insert into inviteId(id, type, createTime)` + 
    ` values('${id}','${type}','${createTime}')`
  return db_query(sql)
}

module.exports = INVITEID
