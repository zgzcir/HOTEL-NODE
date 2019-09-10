/*
 * @De scription: some service for members [register , login]
 * @Author: litle
 * @Date: 2019-08-03 22:50:02
 * @LastEditTime: 2019-09-09 16:00:12
 * @LastEditors: Please set LastEditors
 */

const member = require('../dao/customers')
const orders = require("../dao/orders")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils/utils')
const SECERT = require('../config/config').SECERT
const roomTypes = require('./../dao/roomTypes')
const rooms = require('./../dao/rooms')
const customers = require('./../dao/customers')
const orderService = {}
orderService.booking = async (req, res) => {
  const data = req.body
  try {

    const queCustomerRes = await customers.byIdnum(data.idnum)
    if (queCustomerRes.length == 0) {
      const insertCustomersRes = customers.add({
        customername: data.customerName,
        idnum: data.idnum
      })
      if (insertCustomersRes.length == 0) {
        return res.status(500).send({
          message: '服务器错误，请稍后再试'
        })
      }
    }
    const queRoomTypeRes = await roomTypes.byStandard(data.roomType)
    data.consume = queRoomTypeRes[0].price;
    data.roomType = queRoomTypeRes[0].roomtypeid
    const queRoomRes = await rooms.byRoomType(data.roomType)
    data.roomid = queRoomRes[0].roomid;

    const updateRoomsAfecrows = rooms.updateOccupyByRoomid(data.roomid);
    if (updateRoomsAfecrows == 0) {
      return res.status(500).send({
        message: '服务器错误，请稍后再试'
      })
    }

    const affectedRows = await orders.add(data)
    if (affectedRows != 0) {
      return res.send({
        message: "ok",
        state: true,
      })
    } else {
      return res.send({
        message: "no",
        state: false,
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: '服务器错误，请稍后再试'
    })
  }
}

orderService.GetAll = async (req, res) => {
  const data = req.body;
  try {
    const queryRes = await orders.queryAll()
    if (queryRes.length === 0) {
      return res.send({
        message: "no res",
        state: false,
      })
    } else {
      for (let i = 0; i < queryRes.length; i++) {
        const queCustomerRes = await customers.getNameByidnum(queryRes[i].idnum)
        queryRes[i].customername = queCustomerRes[0].customername
      }
      return res.send({
        data: queryRes,
        message: "ok",
        state: true,
      })
    }

  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: '服务器错误，请稍后再试'
    })
  }


}

orderService.GetAllByIdnum = async (req, res) => {
  const data = req.body;
  try {
    const queryRes = await orders.queryAllByidnum(data)
    if (queryRes.length === 0) {
      return res.send({
        message: "no res",
        state: false,
      })
    } else {
      return res.send({
        data: queryRes,
        message: "ok",
        state: true,
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: '服务器错误，请稍后再试'
    })
  }
}
orderService.updateOrderState = async (req, res) => {
  const data = req.body;
  try {
    const updateOrderAffectedRow = await orders.updateStateById(data);
    if (updateOrderAffectedRow != 0) {
      return res.send({
        message: "ok",
        state: true,
      })

    } else {
      return res.status(500).send({
        message: '服务器错误，请稍后再试'
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: '服务器错误，请稍后再试'
    })
  }
}

module.exports = orderService