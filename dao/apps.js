/*
 * @Description: table apps（appName,price,appDesc,logoUrl,category）
 * @Author: litle
 * @Date: 2019-08-09 10:24:18
 * @LastEditTime: 2019-08-09 14:54:56
 * @LastEditors: Please set LastEditors
 */

const db_query = require('../common/connection')
const apps = {}

/**
 * @description: add a new app
 * @param {Obejct} name, price, desc, logo, category[appName,price,appDesc,logoUrl,category] 
 * @return: {Object} [affectedRows]
 */
apps.add = async field => {
  const { name, price, desc, logo, category } = field
  const sql = `insert into apps ` + 
    ` values('${name}', ${price}, '${desc}', '${logo}', '${category}')`
  return db_query(sql)
}

/**
 * @description: get apps (all or by category)
 * @param {Object} category [String] 
 * @return: {Array}
 */
apps.query = field => {
  const { category } = field
  let sql = `select * from apps`
  if (category === '' || category == undefined) {
    return db_query(sql)
  } else {
    sql += ` where category = '${category}'`
    return db_query(sql)
  }
}

/**
 * @description: delete an app record
 * @param { Obejct } name [String]
 * @return: [Object.AffectedRows]
 */
apps.delete = field => {
  const { name } = field
  const sql = `delete form apps where appName = ${name}`
  return db_query(sql)
}

module.exports = apps
