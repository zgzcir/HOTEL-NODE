/*
 * @Description: update, query, delete about table admins
 * @Author: litle
 * @Date: 2019-07-25 16:30:22
 * @LastEditTime: 2019-09-06 13:36:10
 * @LastEditors: Please set LastEditors
 */
const db_query = require("../common/connection");

const admins = {};

/**
 * @description: get all amins info
 * @param {Object}
 * @return: res
 */
// add an admins
admins.add = field => {
  const { adminName,adminPass } = field
  const sql= 'insert into admins(adminname,adminpass)' +
   ` values('${adminName}','${adminPass}')`;
  return db_query(sql)
}

// get by adminsName
admins.byName = adminsName => {
  const sql = `select * from admins where adminname= '${adminsName}'`;
  return db_query(sql)
};
admins.verifyByPassword=async field=>{
  const {  adminName,adminPass } = field
  const sql=`SELECT * FROM admins WHERE adminname='${adminName}' and adminpass='${adminPass}';`
  return db_query(sql)
}
// update admins lastLoginTime
admins.updateLastLoginTime = adminsInfo => {
  const {adminsName, lastLoginTime} = adminsInfo
  const sql = `update admins set lastLoginTime = '${lastLoginTime}' where adminsName = '${adminsName}'`
  return db_query(sql)
}

module.exports = admins;
