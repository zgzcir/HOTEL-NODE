/*
 * @Description: update, query, delete about table admin
 * @Author: litle
 * @Date: 2019-07-25 16:30:22
 * @LastEditTime: 2019-09-09 16:27:07
 * @LastEditors: Please set LastEditors
 */
const db_query = require("../common/connection");

const goods = {};



goods.getAll=()=>{

const  sql=`select * from goods`
return db_query(sql)
}
module.exports = goods;
