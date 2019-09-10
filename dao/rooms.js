/*
 * @Description: update, query, delete about table admin
 * @Author: litle
 * @Date: 2019-07-25 16:30:22
 * @LastEditTime: 2019-09-08 21:10:28
 * @LastEditors: Please set LastEditors
 */
const db_query = require("../common/connection");

const rooms = {};



 rooms.byRoomType=field=>{
    const sql=`select roomid from rooms where roomtype='${field}' and occupy='0'`;
    return  db_query(sql)
    
 }
 rooms.updateOccupyByRoomid=field=>{
const sql=`UPDATE rooms SET occupy='1' WHERE roomid='${field}'`

return  db_query(sql)

    
 }

 rooms.getAll=()=>{
    const sql=`select * from rooms`
    return db_query(sql);
 }

module.exports = rooms;
