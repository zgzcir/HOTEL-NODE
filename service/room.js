/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-08 20:44:26
 * @LastEditTime: 2019-09-08 21:10:27
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
const roomService = {}
roomService.getRoomState = async (req, res) => {
    const queRoomRes = await rooms.getAll();
    try{
    if (queRoomRes.length !== 0) {
        for (let i = 0; i < queRoomRes.length; i++) {
            const queRoomTypeRes = await roomTypes.byTypeID(queRoomRes[i].roomtype)
            if(queRoomTypeRes.length!=0)
            {
                
                queRoomRes[i].standard=queRoomTypeRes[0].standard;
                queRoomRes[i].price=queRoomTypeRes[0].price;
            }
            else
            {
                return res.status(500).send({
                    message: '服务器错误，请稍后再试'
                  })
            }
        }
        return res.send({
            data: queRoomRes,
            message: "ok",
            state: true,
          })
    }
    else{
        return res.status(500).send({
            message: '服务器错误，请稍后再试'
          })
    }
    }
    catch(e)
    {
  console.log(e)

        return res.status(500).send({
            message: '服务器错误，请稍后再试'
          })
    }



}
module.exports = roomService
