/*
 * @Description: update, query, delete about table admin
 * @Author: litle
 * @Date: 2019-07-25 16:30:22
 * @LastEditTime: 2019-09-09 10:10:03
 * @LastEditors: Please set LastEditors
 */
const db_query = require("../common/connection");

const orders = {};


orders.add = field => {
   const sql = `INSERT INTO orders (idnum, roomid, orderstate, sdate,days, roomtype,billstate) VALUES ('${field.idnum}', '${field.roomid}', '${field.orderState}', '${field.sdate}', '${field.days}', '${field.roomType}','${field.billState}');`
   return db_query(sql)
}
orders.queryAllByidnum = field => {
   const {
      idnum
   } = field;
   const sql = `SELECT * from orders where idnum='${idnum}';`
   return db_query(sql)
}
orders.queryAll=()=>{
const sql="select * from orders"
return db_query(sql)

}
orders.updateStateById=field=>{
 
   const{orderState,orderid}=field
   const sql=`update orders set orderstate='${orderState}' where orderid='${orderid}'` 
   return db_query(sql)

}

module.exports = orders;