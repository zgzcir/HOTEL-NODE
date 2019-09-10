/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:18:48
 * @LastEditTime: 2019-09-03 08:29:59
 * @LastEditors: Please set LastEditors
 */
const SECERT = 'App-puzi'
module.exports = {
  env: 'development',
  port: 80,
  static_path: 'dist/',
  SECERT,
  mysql: {
    connectionLimit: 100,
    host: '47.106.254.223',
    user: 'root',
    password: 'a123456789...',
    database: 'apps-dbms',
    dataString: 'date',
    timezone: '+8:00',
    dateStrings: true
  }
}
