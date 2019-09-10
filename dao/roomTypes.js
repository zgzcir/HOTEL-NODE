/*
 * @Description: update, query, delete about table admin
 * @Author: litle
 * @Date: 2019-07-25 16:30:22
 * @LastEditTime: 2019-09-08 20:47:00
 * @LastEditors: Please set LastEditors
 */
const db_query = require("../common/connection");

const roomTypes = {};



 roomTypes.byStandard=field=>{
const sql=`select roomtypeid,price from roomtypes where standard='${field}'`;
return  db_query(sql)
 }

 roomTypes.byTypeID=typeId=>{
const sql=`select standard,price from roomtypes where roomtypeid='${typeId}'`
return db_query(sql)
 }

module.exports = roomTypes;
