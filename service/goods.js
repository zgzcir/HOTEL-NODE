/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-08 20:44:26
 * @LastEditTime: 2019-09-09 16:29:37
 * @LastEditors: Please set LastEditors
 */
const member = require('../dao/customers')
const orders = require("../dao/orders")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils/utils')
const SECERT = require('../config/config').SECERT
const roomTypes = require('../dao/roomTypes')
const rooms = require('../dao/rooms')
const customers = require('../dao/customers')
const goods = require('../dao/goods')
const goodsService = {}
goodsService.getGoods = async (req, res) => {
try{
const queGoodsRes=await goods.getAll();
if(queGoodsRes.length!=0)
{
    return res.send({
        data:queGoodsRes,
        message: "ok",
        state: true,
      })
   
}   else {
    return res.send({
      message: "no",
      state: false,
    })}
}
catch(e)
{
    console.log(e)
    return res.status(500).send({
      message: '服务器错误，请稍后再试'
    })
}}


module.exports = goodsService
