/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-18 04:59:50
 * @LastEditTime: 2019-09-06 13:32:19
 * @LastEditors: Please set LastEditors
 */
global['config'] = require('./config/config')

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const indexRoutes = require('./routes/index')
const bgRoutes = require('./routes/bg')

const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  next();
})
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(path.join(__dirname, global["config"]['static_path'])));
app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'public/images')))

// routers config
app.use('/api', indexRoutes)
// app.use('/bg', bgRoutes)


// for fontend single page apps
app.use((req,res) => {
  let indexReg = /^\/index\//g;
  let bgReg = /^\/bg\//g;
  let index = indexReg.exec(req._parsedUrl.pathname);
  let bg = bgReg.exec(req._parsedUrl.pathname);
  res.cookie("path", req.url);
  if (index) {
    res.redirect("/index.html");
  } else if (bg) { 
    res.redirect('/bg.html')
  }else {
    res.redirect("/");
  }
})

module.exports = app