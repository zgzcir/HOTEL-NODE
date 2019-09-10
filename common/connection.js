/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-25 16:14:45
 * @LastEditTime: 2019-08-09 12:00:17
 * @LastEditors: Please set LastEditors
 */
const mysql = require("mysql");
const $dbConfig = require("./../config/config").mysql;

const pool = mysql.createPool($dbConfig);

const db_query = function(sql, options, callback) {
  pool.getConnection(function(err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, options, function(err, results, fields) {
        conn.release();
        callback(err, results, fields);
      });
    }
  });
};
function query(sql) {
  console.log(sql)
  return new Promise((resolve, reject) => {
    db_query(sql, ( err , data) => {
      if(err) {
        console.log(err)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
module.exports = query;
