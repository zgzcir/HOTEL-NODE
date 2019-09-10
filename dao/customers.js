/*
 * @Description: update, db_query, delete about table member
 * @Author: litle
 * @Date: 2019-08-03 22:26:04
 * @LastEditTime: 2019-09-08 19:52:17
 * @LastEditors: Please set LastEditors
 */

 const db_query = require('../common/connection')

 const customers = {}

 /**
  * @description: get all members info
  * @param {type} 
  * @return: {Array} [ contain all members info ]
  */


customers.getNameByidnum=idnum=>{
  const sql=`select customername from customers where idnum='${idnum}'`
  return db_query(sql)
}

  customers.getall = () => {
    // do not do pagination for the time being
    const sql = `select * from members`
    return db_query(sql)
  }

/**
 * @description: add a new member
 * @param {Object} [ name, ps, time, type, fadetime, right] 
 * @return: {Object} [object.affectedRows?]
 */
customers.add = async field => {
  const sql=`INSERT INTO customers (customername,idnum) VALUES ('${field.customername}', '${field.idnum}');`
  return db_query(sql)
}
customers.verifyByPassword=async field=>{
  const {  username,password } = field
  const sql=`SELECT username FROM customers WHERE username='${username}' and password='${password}';`
  return db_query(sql)
}
customers.addIDInfor=async field=>{
  const{username,idnum,name}=field
  const sql=`UPDATE customers
  SET idnum = '${idnum}', customername = '${name}'
  WHERE username='${username}';`
  return db_query(sql)
}
 /**
  * @description: check is the mName already exited
  * @param {Obejct} [mName] 
  * @return: {Array} [rows]
  */
 customers.byUsername = async username => {
   const sql = `select * from customers where username = '${username}'`
   return db_query(sql)
 }
 /**
  * @description: checking the invite id of member is serviceable
  * @param {Obejct} [inviteId] 
  * @return: {Array} [rows]
  */
customers.byInviteId = async inviteId => {
  const sql = `select * from inviteId where id = '${inviteId}' and belong is null`
  return db_query(sql)
}
/**
 * @description: update inviteId info after register a new member
 * @param [useTime,belong,inviteId]
 * @return: [object.affectedRows]
 */
customers.updateInviteId = async (useTime, belong, inviteId) => {
  const sql = `update inviteId set useTime = '${useTime}', belong = '${belong}'` +
    ` where id = '${inviteId}'`
  return db_query(sql)
}
/**
 * @description: 
 * @param  [type,name]
 * @return: 
 */
customers.queryOption = async (type, name, right = 1) => {
  let sql = `select * from members where memberRight = ${right} `
    if(name) {
      sql += ` and Mname ='${name}'`
    }
    if (type) {
      sql += ` and memberType = '${type}'`
    }
  return db_query(sql)
}

customers.byIdnum=async(idnum)=>{
let sql=`select * from customers where idnum ='${idnum}'`
return db_query(sql)
  
}

module.exports = customers
